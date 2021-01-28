"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var preventives_routes_1 = __importDefault(require("./preventives.routes"));
var sessions_routes_1 = __importDefault(require("../routes/sessions.routes"));
var users_routes_1 = __importDefault(require("./users.routes"));
var equipaments_routes_1 = __importDefault(require("./equipaments.routes"));
var routes = express_1.Router();
routes.use('/preventives', preventives_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/equipaments', equipaments_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
exports.default = routes;
