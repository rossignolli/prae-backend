/* eslint-disable import/extensions */
import { Router } from 'express';
import {
    startOfHour,
    parseISO,
    differenceInDays,
    parse,
    toDate,
    differenceInBusinessDays,
} from 'date-fns';
import PDFPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import CreateJobExecutionAndPreventive from '../services/CreateJobExecutionAndPreventive';
import StartMonitoringService from '../services/StartMonitoringEquipamentService';
import { getRepository } from 'typeorm';
import Preventive from '../models/Preventives';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import JobExecution from '../models/JobExecution';

const preventivesRouter = Router();

preventivesRouter.use(ensureAuthenticated);

preventivesRouter.get('/', async (request, response) => {
    const preventivesRepository = getRepository(Preventive);
    const preventives = await preventivesRepository.find();
    return response.json(preventives);
});

preventivesRouter.get('/equipament/:id', async (request, response) => {
    const { id } = request.params;
    const preventivesRepository = getRepository(Preventive);
    const preventives = await preventivesRepository.find({
        where: { equipament_id: id },
    });
    return response.json(preventives);
});

preventivesRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    const preventivesRepository = getRepository(JobExecution);

    const preventives = await preventivesRepository.find({
        where: { preventive_id: id },
    });

    return response.json(preventives);
});

preventivesRouter.post('/monitor/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const { date } = request.body;

        const createMonirtoringService = new StartMonitoringService();
        const equipament = await createMonirtoringService.execute({
            id,
            date,
        });

        const calcDate = differenceInDays(
            equipament.dateOfExpiration,
            new Date(),
        );

        const calcDateBusinessDays = differenceInBusinessDays(
            equipament.dateOfExpiration,
            new Date(),
        );

        console.log(
            `Equipament "${equipament.name}" is expiring in ${calcDate} or ${calcDateBusinessDays} in business Days`,
        );

        return response.json({
            sucess: `Equipament "${equipament.name}" is expiring in ${calcDate} or ${calcDateBusinessDays} in business Days`,
        });
    } catch (err) {
        return response.status(400).json({ error: 'Algo deu errado' });
    }
});

preventivesRouter.post('/', async (request, response) => {
    const { equipament_id, technician_id, isCorrective, jobs } = request.body;

    // Transformação de dados para aplicação usar, pode ser deixado na rota

    // 1 => Gerar  uma Preventive ID
    // 2 => Criar uma Job Execution com o Preventive ID
    // 3 => Gerar uma Job Execution para cada item do array de jobs

    const createJobExecutionAndPreventive = new CreateJobExecutionAndPreventive();
    const JobExecution = await createJobExecutionAndPreventive.execute({
        equipament_id,
        technician_id,
        isCorrective,
        jobs,
    });

    return response.json(JobExecution);
});

preventivesRouter.get('/report/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const preventivesRepository = getRepository(Preventive);
        const jobsExecutionRepository = getRepository(JobExecution);

        const preventiveReport = await preventivesRepository.findOne({
            where: { id },
        });

        const jobs = await jobsExecutionRepository.find({
            where: { preventive_id: id },
        });

        const body: any = [];

        jobs.forEach((brand, i) => {
            const rows = new Array();

            rows.push({
                text: `${i + 1}`,
                alignment: 'center',
                bold: true,
                margin: [0, 5, 0, 5],
            });

            rows.push({
                text: brand.job_name,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            });
            rows.push({
                text: brand.supply_name,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            });

            rows.push({
                text: `R$ ${brand.supply_price}`,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            });

            body.push(rows);
        });

        let total;

        if (preventiveReport?.total_price) {
            total = parseFloat(preventiveReport.total_price).toFixed(2);
        }

        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique',
            },
        };

        const printer = new PDFPrinter(fonts);

        const today = new Date();

        const docDef: TDocumentDefinitions = {
            defaultStyle: { font: 'Helvetica' },
            content: [
                {
                    image: 'Praelogo',
                    width: 150,
                    height: 42,
                    alignment: 'center',
                },
                {
                    text: `Resumo de manutenção`,
                    alignment: 'center',
                    style: 'header',
                    margin: [0, 20, 0, 0],
                },
                {
                    text: `${today.toLocaleString('pt-BR')}`,
                    alignment: 'center',
                    style: 'subtitle',
                    margin: [0, 5, 0, 0],
                },

                {
                    text: `Ação ${
                        preventiveReport?.isCorrective
                            ? 'Corretiva'
                            : 'Preventiva'
                    }`,
                    alignment: 'left',
                    style: 'header',
                    margin: [0, 10, 0, 5],
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [20, '*', 100, '*'],
                        body: [
                            [
                                {
                                    text: 'ID:',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: preventiveReport?.id,
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: 'Técnico Responsável:',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: preventiveReport?.technician.name,
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                            ],
                        ],
                    },
                },
                {
                    text: `${
                        jobs.length > 1 ? 'Procedimentos:' : 'Procedimento:'
                    } ${jobs.length}`,
                    alignment: 'left',
                    style: 'header',
                    margin: [0, 10, 0, 5],
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [20, '*', '*', '*'],
                        body: [
                            [
                                {
                                    text: 'ID:',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: 'Nome',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: 'Suprimento:',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                                {
                                    text: 'Preço',
                                    alignment: 'center',
                                    bold: true,
                                    margin: [0, 5, 0, 5],
                                },
                            ],
                            ...body,
                        ],
                    },
                },
                {
                    text: `Custo total:`,
                    alignment: 'right',
                    style: 'header',
                    margin: [0, 10, 0, 0],
                },
                {
                    text: `R$ ${total}`,
                    alignment: 'right',
                    style: 'subtitle',
                    margin: [0, 5, 0, 0],
                },
                {
                    text: `_______________________`,
                    alignment: 'center',
                    style: 'header',
                    margin: [0, 10, 0, 5],
                },
                {
                    text: `${preventiveReport?.technician.name}`,
                    alignment: 'center',
                    style: 'header',
                    margin: [0, 10, 0, 5],
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subtitle: {
                    fontSize: 16,
                    bold: true,
                    color: 'gray',
                },
            },
            images: {
                Praelogo:
                    'data:image/png;base64,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',
            },
        };

        const pdfDoc = printer.createPdfKitDocument(docDef);

        const chunks: any = [];

        pdfDoc.on('data', chunk => {
            chunks.push(chunk);
        });
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            return response.end(result);
        });

        pdfDoc.end();
    } catch (err) {
        //@ts-ignore
        return response.status(400).json({ err: err.message });
    }
});

export default preventivesRouter;
