import { connection } from './db.js';

export class FetchFromDb {
    results_by_year = [];
    results_by_month = [];
    results_by_week = [];
    period;
    type_item;
    year;
    type_top;
    DB_SOURCE = "tops_test";
    connection;

    constructor(type_top, year = null, period = null, type_item) {
        this.year = year;
        this.type_item = type_item;
        this.type_top = type_top;
        this.period = period;
        this.connection = connection;
    }

    fetch() {
        let sql = this.getSql();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                    this.addResults(results);
                }
            });
        });
    }

    getSql() {
        let sql = '';
        switch (this.type_top) {
            case 'anual':
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_item = ? AND type_top = ? AND ident_top = ?;`;
                return this.connection.format(sql, [this.type_item, this.type_top, this.year]);
            case 'lunar':
            case 'saptamanal':
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_top = ? AND type_item = ? AND SUBSTRING_INDEX(ident_top, '.', 1) = ? AND SUBSTRING_INDEX(ident_top, '.', -1) = ? ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC, CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                return this.connection.format(sql, [this.type_top, this.type_item, this.period, this.year]);
            default:
                throw new Error('Invalid type_top');
        }
    }

    addResults(results) {
        switch (this.period) {
            case 'anual':
                this.results_by_year = results;
                console.log(this.results_by_year);
                break;
            case 'lunar':
                this.results_by_month = results;
                break;
            case 'saptamanal':
                this.results_by_week = results;
                break;

        }
    }
}
