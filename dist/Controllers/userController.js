"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllUsers = async (req, res) => {
    res.send('hello, from the server side');
};
const getOneUser = async (req, res) => {
    res.send('get one user');
};
exports.default = { getAllUsers, getOneUser };
