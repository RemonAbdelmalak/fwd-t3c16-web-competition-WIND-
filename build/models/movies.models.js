"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Moviemodel {
    async create(u) {
        try {
            const sql = "INSERT INTO movies (name, relase_date) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.name, u.relase_date]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new movie. Error: ${err}`);
        }
    }
    async getOne(id) {
        try {
            const sql = `SELECT * FROM movies WHERE id=($1)`;
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find movie ${id}, ${error.message}`);
        }
    }
    async getMany() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * from movies";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error at retrieving movies ${error.message}`);
        }
    }
    async updateOne(u, id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `UPDATE movies 
                  SET name=$1, relase_date=$2
                  WHERE id=$3 
                  RETURNING id, name ,relase_date `;
            const result = await connection.query(sql, [u.name, u.relase_date, id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not update movie: ${u.name}, ${error.message}`);
        }
    }
    async deleteOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM movies 
                  WHERE id=($1) 
                  RETURNING id, name`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete movie ${id}, ${error.message}`);
        }
    }
}
exports.default = Moviemodel;
