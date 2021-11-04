import { isPast } from 'date-fns';
import { getRepository } from 'typeorm';
import Equipament from '../../models/Equipament';
import User from '../../models/User';
import mailgun from 'mailgun-js';
import schedule from 'node-schedule';

class MailingMonitor {
    async execute() {
        const rule = new schedule.RecurrenceRule();
        rule.hour = 2;
        schedule.scheduleJob(rule, async function () {
            const api_key = process.env.MAILGUNGUN_KEY;
            const DOMAIN = process.env.MAILGUNDOMAIN;

            const users = getRepository(User);
            const equipamentsRepository = getRepository(Equipament);

            const equipaments = await equipamentsRepository.find();

            equipaments.forEach(equipament => {
                equipament.expired = isPast(equipament.dateOfExpiration);
            });

            const activedUsers = await users.find({
                where: { isActive: true },
            });

            if (api_key && DOMAIN) {
                activedUsers.map(user => {});

                const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

                const bodyHtmlEmail = `
            <b> Esses equipamentos requerem atenção <br/> </b>
            <ul>
            ${equipaments.map(equipament => {
                // prettier-ignore
                return `<li>${equipament.name}</li>`
            })}
            </ul>
            `;
                const data = {
                    from: 'Prae - <vitorrossignolli@gmail.com>',
                    to: `${activedUsers.map(user => {
                        return `${user.email}`;
                    })}`,
                    subject: 'Prae -  Alerta Diário de Equipamentos Expirados',
                    html: bodyHtmlEmail.replace(/,/g, ''),
                };

                mg.messages().send(data, function (error, body) {
                    console.log(body);
                });
            }
        });

        return null;
    }
}

export default MailingMonitor;
