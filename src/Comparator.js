import { connection } from './db.js';


export class Comparator {
    DB_SOURCE = "tops_test";
    connection;

    constructor() {
        this.connection = connection;
    }

    generateComparison(Result) {
        const { sql, params } = this.getSql(Result);

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (results.length < 2) {
                    Result.setComparison('N/A');
                    resolve(Result);
                    return;
                }

                const currentLine = parseInt(Result.line, 10);
                const previousLine = parseInt(results[1].line, 10);

                if (currentLine > previousLine) {
                    Result.setComparison("In scadere");
                } else if (currentLine < previousLine) {
                    Result.setComparison("In crestere");
                } else if (currentLine === previousLine) {
                    Result.setComparison("Stagnare");
                }

                resolve(Result);
            });
        });
    }

    getSql(Result) {
        let sql;
        let params = [];
        switch (Result.type_top) {
            case 'anual':
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_top = ? AND CAST(ident_top AS UNSIGNED) <= ? AND type_item = ? AND prod = ? ORDER BY CAST(ident_top AS UNSIGNED) DESC LIMIT 2;`;
                params = ['anual', Result.ident_top, Result.type_item, Result.prod];
                break;
            case 'lunar':
            case 'saptamanal':
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_top = ? AND CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) = ? AND CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) <= ? AND type_item = ? AND prod = ? ORDER BY CAST(ident_top AS UNSIGNED) DESC LIMIT 2;`;
                const [period, year] = Result.ident_top.split(".");
                params = [Result.type_top, year, period, Result.type_item, Result.prod];
                break;
        }
        return { sql, params };
    }
}