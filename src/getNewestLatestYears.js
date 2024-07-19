import { connection} from './db.js'

export function getNewestLatestYears() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT YEAR(time) AS year FROM actions ORDER BY year ASC;`;
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const newest = results[results.length - 1]['year'];
                const oldest = results[0]['year'];
                resolve({ newest, oldest });
            }
        });
    });
}