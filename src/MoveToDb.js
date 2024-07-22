import { connection } from './db.js';

export class MoveToDb {
    values = '';
    RESULTS_DB = process.env.DB_HOST_TEST;
    RESULTS_DB_COLUMNS = "(" +
        "prod, " +
        "line, " +
        "type_item, " +
        "type_top, " +
        "ident_top, " +
        "sumofvalues" +
        ")";



    constructor() {
        this.connection = connection;
    }

    moveToDb(topLines) {
        return new Promise((resolve, reject) => {
            this.values = topLines.map(topLine => this.processValues(topLine)).join(", ");
            let sql = this.getSql()
            this.connection.query(sql, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    processValues(topLine) {
        let year = '';
        switch (topLine.type_top) {
            case "anual":
                year = topLine.ident_top;
                return `(${topLine.product_id}, ${topLine.rank}, '${topLine.type_item}', '${topLine.type_top}', ${year}, ${topLine.sum_of_values})`;
            case "lunar":
                return `(${topLine.product_id}, ${topLine.rank}, '${topLine.type_item}', '${topLine.type_top}', ${topLine.ident_top}, ${topLine.sum_of_values})`;
            case "saptamanal":
                return `(${topLine.product_id}, ${topLine.rank}, '${topLine.type_item}', '${topLine.type_top}', ${topLine.ident_top}, ${topLine.sum_of_values})`;
        }
    }

    getSql() {
        return "INSERT INTO " + this.RESULTS_DB + " " +
            this.RESULTS_DB_COLUMNS + " VALUES " + this.values+";";
    }
}
