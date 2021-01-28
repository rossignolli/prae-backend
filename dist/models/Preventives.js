"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Equipament_1 = __importDefault(require("./Equipament"));
var Preventive = /** @class */ (function () {
    function Preventive() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Preventive.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preventive.prototype, "equipament_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Equipament_1.default; }),
        typeorm_1.JoinColumn({ name: 'equipament_id' }),
        __metadata("design:type", Equipament_1.default)
    ], Preventive.prototype, "equipament", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preventive.prototype, "technician_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'technician_id' }),
        __metadata("design:type", String)
    ], Preventive.prototype, "technician", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Preventive.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preventive.prototype, "jobs", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Preventive.prototype, "isCorrective", void 0);
    Preventive = __decorate([
        typeorm_1.Entity('preventives')
    ], Preventive);
    return Preventive;
}());
exports.default = Preventive;
