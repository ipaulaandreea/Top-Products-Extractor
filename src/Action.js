import { connection } from "./db.js";
import {TopLine} from "./TopLine.js";

export class Action {
    MAX_TOP = 100;
    PRODUCT_ID_ALIAS = 'product_id';
    TOTAL_ALIAS = 'total';
    IDENT_TOP_ALIAS = 'ident_top';

    constructor() {
        this.connection = connection;
    }

    getSqlTemplate(identTopQuery, intervalQuery, type) {
        return `
            SELECT 
                prod AS ${this.PRODUCT_ID_ALIAS}, 
                count(*) AS ${this.TOTAL_ALIAS}, 
                ${identTopQuery}
            FROM actions 
            WHERE 
                ${intervalQuery}
                AND type = ${type} 
            GROUP BY ${this.PRODUCT_ID_ALIAS}, ${this.IDENT_TOP_ALIAS}
            ORDER BY ${this.TOTAL_ALIAS} DESC 
            LIMIT ${this.MAX_TOP};
        `;
    }

    getTop(periodObject, type) {
        return new Promise((resolve, reject) => {
            this.connection.query(this.getSql(periodObject, type), (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    let actions = [];
                    for (let i = 0; i < results.length; i++) {
                        actions.push(
                            new TopLine(
                                i + 1,
                                type,
                                periodObject.periodType,
                                results[i][this.IDENT_TOP_ALIAS],
                                results[i][this.TOTAL_ALIAS],
                                results[i][this.PRODUCT_ID_ALIAS]
                            )
                        );
                    }
                    resolve(actions);
                }
            });
        });
    }

    getSql(periodObject, type) {
        let identTopQueryTemplate = this.getIdentTopQueryTemplate(periodObject);
        let intervalQueryTemplate = this.getIntervalQueryTemplate(periodObject);
        return this.getSqlTemplate(identTopQueryTemplate, intervalQueryTemplate, type);
    }

    getIdentTopQueryTemplate(periodObject) {
        let interval;

        switch (periodObject.periodType) {
            case 'anual':
                interval = "year(time)";
                break;
            case 'saptamanal':
                interval = "concat(week(time), '.', year(time))";
                break;
            case 'lunar':
                interval = "concat(month(time), '.', year(time))";
                break;
            default:
                throw new Error(`Unknown periodType: ${periodObject.periodType}`);
        }

        return `${interval} AS ${this.IDENT_TOP_ALIAS}`;
    }

    getIntervalQueryTemplate(periodObject) {
        let interval;
        let year = periodObject.year;

        switch (periodObject.periodType) {
            case 'anual':
                interval = `year(time) = ${year}`;
                break;
            case 'saptamanal':
                let week = periodObject.week;
                interval = `year(time) = ${year} AND week(time) = ${week}`;
                break;
            case 'lunar':
                let month = periodObject.month;
                interval = `year(time) = ${year} AND month(time) = ${month}`;
                break;
            default:
                throw new Error(`Unknown periodType: ${periodObject.periodType}`);
        }

        return interval;
    }



}
