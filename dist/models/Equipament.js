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
var Images_1 = __importDefault(require("./Images"));
var User_1 = __importDefault(require("./User"));
var Equipament = /** @class */ (function () {
    function Equipament() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Equipament.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Equipament.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Equipament.prototype, "description", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Equipament.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Equipament.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Equipament.prototype, "monitor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Equipament.prototype, "critical", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Equipament.prototype, "levelToManage", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Equipament.prototype, "dateStartedMonitoring", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Equipament.prototype, "dateOfExpiration", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Equipament.prototype, "dateLastStopMonitor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Equipament.prototype, "timesStopped", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Equipament.prototype, "technician_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Images_1.default; }, function (image) { return image.images; }, {
            cascade: ['insert', 'update'],
        }),
        typeorm_1.JoinColumn({ name: 'equipament_id' }),
        __metadata("design:type", Array)
    ], Equipament.prototype, "images", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: 'technician_id' }),
        __metadata("design:type", String)
    ], Equipament.prototype, "technician", void 0);
    Equipament = __decorate([
        typeorm_1.Entity('equipaments')
    ], Equipament);
    return Equipament;
}());
exports.default = Equipament;
