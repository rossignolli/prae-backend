"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
var express_1 = require("express");
var date_fns_1 = require("date-fns");
var CreateRegisterPreventiveServices_1 = __importDefault(require("../services/CreateRegisterPreventiveServices"));
var StartMonitoringEquipamentService_1 = __importDefault(require("../services/StartMonitoringEquipamentService"));
var typeorm_1 = require("typeorm");
var Preventives_1 = __importDefault(require("../models/Preventives"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var preventivesRouter = express_1.Router();
preventivesRouter.use(ensureAuthenticated_1.default);
preventivesRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var preventivesRepository, preventives;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                preventivesRepository = typeorm_1.getRepository(Preventives_1.default);
                return [4 /*yield*/, preventivesRepository.find()];
            case 1:
                preventives = _a.sent();
                return [2 /*return*/, response.json(preventives)];
        }
    });
}); });
preventivesRouter.post('/monitor', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var date, equipamentId, createMonirtoringService, equipament, calcDate, calcDateBusinessDays, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                date = request.body.date;
                equipamentId = request.query.equipamentId;
                createMonirtoringService = new StartMonitoringEquipamentService_1.default();
                return [4 /*yield*/, createMonirtoringService.execute({
                        id: equipamentId,
                        date: date,
                    })];
            case 1:
                equipament = _a.sent();
                calcDate = date_fns_1.differenceInDays(equipament.dateOfExpiration, new Date());
                calcDateBusinessDays = date_fns_1.differenceInBusinessDays(equipament.dateOfExpiration, new Date());
                console.log("Equipament \"" + equipament.name + "\" is expiring in " + calcDate + " or " + calcDateBusinessDays + " in business Days");
                return [2 /*return*/, response.json(equipament)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, response.status(400).json({ error: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
preventivesRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, equipament_id, technician_id, jobs, isCorrective, createAppointmentService, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, equipament_id = _a.equipament_id, technician_id = _a.technician_id, jobs = _a.jobs, isCorrective = _a.isCorrective;
                createAppointmentService = new CreateRegisterPreventiveServices_1.default();
                return [4 /*yield*/, createAppointmentService.execute({
                        equipament_id: equipament_id,
                        technician_id: technician_id,
                        jobs: jobs,
                        isCorrective: isCorrective,
                    })];
            case 1:
                appointment = _b.sent();
                return [2 /*return*/, response.json(appointment)];
        }
    });
}); });
exports.default = preventivesRouter;
