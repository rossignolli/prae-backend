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
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("../models/User"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var upload_1 = __importDefault(require("../config/upload"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var UpdateUserAvatarService = /** @class */ (function () {
    function UpdateUserAvatarService() {
    }
    UpdateUserAvatarService.prototype.execute = function (_a) {
        var user_id = _a.user_id, avatarFilename = _a.avatarFilename;
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, user, userAvatarFilepath, userAvatarFilesExistirs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        usersRepository = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, usersRepository.findOne(user_id)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new AppError_1.default('Only authneticated users can change avatar.', 401);
                        }
                        if (!user.avatar) return [3 /*break*/, 4];
                        userAvatarFilepath = path_1.default.join(upload_1.default.directory, user.avatar);
                        return [4 /*yield*/, fs_1.default.promises.stat(userAvatarFilepath)];
                    case 2:
                        userAvatarFilesExistirs = _b.sent();
                        if (!userAvatarFilesExistirs) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_1.default.promises.unlink(userAvatarFilepath)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        user.avatar = avatarFilename;
                        return [4 /*yield*/, usersRepository.save(user)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UpdateUserAvatarService;
}());
exports.default = UpdateUserAvatarService;
