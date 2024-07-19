import { connection} from './db.js'

export function getTop100ByWeek(year, week, type) {
    return new Promise((resolve, reject) => {
        let sql = "";
        switch (type) {
            case 1:
                sql = `SELECT prod, count(*) AS total_sales, concat(week(time),'.', year(time)) as saptamana_an FROM actions where year(time) = ${year} AND week(time) = ${week} AND type = ${type} GROUP BY prod, saptamana_an ORDER BY total_sales DESC LIMIT 100;`
                break;
            case 2:
                sql = `SELECT prod, count(*) AS total_visits, concat(week(time),'.', year(time)) as saptamana_an FROM actions where year(time) = ${year} AND week(time) = ${week} AND type = ${type} GROUP BY prod, saptamana_an ORDER BY total_visits DESC LIMIT 100;`
                break;
            case 3:
                sql = `SELECT prod, count(*) AS total_likes, concat(week(time),'.', year(time)) as saptamana_an FROM actions where year(time) = ${year} AND week(time) = ${week} AND type = ${type} GROUP BY prod, saptamana_an ORDER BY total_likes DESC LIMIT 100;`
                break;
        }
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {

                resolve(results);
            }
        });
    });
}