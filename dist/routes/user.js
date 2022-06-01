"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../Controllers/userController"));
const userRour = (0, express_1.Router)();
userRour.route('/').get(userController_1.default.getAllUsers).post();
userRour.route('/:id').get(userController_1.default.getOneUser).patch().delete();
exports.default = userRour;
