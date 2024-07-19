import { connection} from './db.js'

export function moveToDb_weekly(results, year, type) {
    return new Promise((resolve, reject) => {
        let queries = [];

        for (let entry = 0; entry < results.length; entry++) {
            let sql = "";
            switch (type) {
                case 1:
                    sql = `INSERT INTO tops (prod, line, type_item, type_top, ident_top, sumofvalues) VALUES ('${results[entry]['prod']}', ${entry+1}, 'vanzare', 'saptamanal', ${results[entry]['saptamana_an']}, ${results[entry]['total_sales']});`;
                    break;
                case 2:
                    sql = `INSERT INTO tops (prod, line, type_item, type_top, ident_top, sumofvalues) VALUES ('${results[entry]['prod']}', ${entry+1}, 'vizita', 'saptamanal',  ${results[entry]['saptamana_an']}, ${results[entry]['total_visits']});`;
                    break;
                case 3:
                    sql = `INSERT INTO tops (prod, line, type_item, type_top, ident_top, sumofvalues) VALUES ('${results[entry]['prod']}', ${entry+1}, 'like', 'saptamanal',  ${results[entry]['saptamana_an']}, ${results[entry]['total_likes']});`;
                    break;
            }
            queries.push(sql);
        }

        let queryPromises = queries.map(query => new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }));

        Promise.all(queryPromises)
            .then(results => resolve(results))
            .catch(error => reject(error));
    });
}