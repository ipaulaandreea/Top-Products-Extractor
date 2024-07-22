import { connection } from './db.js';

export class FetchFromDb {
    results_by_year = [];
    results_by_month = [];
    results_by_week = [];
    period;
    type_item;
    year;
    month;
    week;
    type_top;
    DB_SOURCE="tops_test";
    connection;

    constructor(type_top, year = null, month = null, week = null, type_item) {
        this.year = year;
        this.month = month;
        this.week = week;
        this.type_item = type_item;
        this.type_top = type_top;
        this.period = week != null ? `${week}.${year}` : month != null ? `${month}.${year}` : `${year}`;
        this.connection = connection;
    }

    fetch() {
        let sql = this.getSql();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    this.addResults(results);
                    resolve(results);
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
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_top = ? AND type_item = ? AND SUBSTRING_INDEX(ident_top, '.', 1) = ? AND SUBSTRING_INDEX(ident_top, '.', -1) = ? ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC, CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                return this.connection.format(sql, [this.type_top, this.type_item, this.month, this.year]);
            case 'saptamanal':
                sql = `SELECT * FROM ${this.DB_SOURCE} WHERE type_top = ? AND type_item = ? AND SUBSTRING_INDEX(ident_top, '.', 1) = ? AND SUBSTRING_INDEX(ident_top, '.', -1) = ? ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC, CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                return this.connection.format(sql, [this.type_top, this.type_item, this.week, this.year]);
            default:
                throw new Error('Invalid type_top');
        }
    }

    addResults(results) {
        switch (this.type_top) {
            case 'anual':
                this.results_by_year = results;
                break;
            case 'lunar':
                this.results_by_month = results;
                break;
            case 'saptamanal':
                this.results_by_week = results;
                break;
            default:
                throw new Error('Invalid type_top');
        }
    }
}
