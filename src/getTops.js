import {connection} from './db.js';

export function getTopsByYear(year, type){
    let sql = "";
    return new Promise((resolve, reject) => {
        switch (type) {
            case 1:
                sql = `SELECT * FROM tops where type_item = 'vanzare' AND type_top = 'anual' and ident_top = '${year}';`;
                break;
            case 2:
                sql = `SELECT * FROM tops where type_item = 'vizita' AND type_top = 'anual' and ident_top = '${year}';`;
                break;
            case 3:
                sql = `SELECT * FROM tops where type_item = 'like' AND type_top = 'anual' and ident_top = '${year}';`;
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

export function getTopsByMonth(year, month, type){
    let sql = "";
    return new Promise((resolve, reject) => {
        switch (type) {
            case 1:
                sql = `SELECT *
                FROM tops
                WHERE type_top = 'lunar'
                AND type_item = 'vanzare'
                AND SUBSTRING_INDEX(ident_top, '.', 1) = ${month}         
                AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}     
                ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC, 
                CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                break;
            case 2:
                sql = `SELECT *
                    FROM tops
                    WHERE type_top = 'lunar'
                    AND type_item = 'vizita'
                    AND SUBSTRING_INDEX(ident_top, '.', 1) = ${month}
                    AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}
                    ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC,
                    CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                break;
            case 3:
                sql = `SELECT *
                    FROM tops
                    WHERE type_top = 'lunar'
                    AND type_item = 'like'
                    AND SUBSTRING_INDEX(ident_top, '.', 1) = ${month}
                    AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}
                    ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC,
                    CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
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

export function getTopsByWeek(year, week, type){
    let sql = "";
    return new Promise((resolve, reject) => {
        switch (type) {
            case 1:
                sql = `SELECT *
                FROM tops
                WHERE type_top = 'saptamanal'
                AND type_item = 'vanzare'
                AND SUBSTRING_INDEX(ident_top, '.', 1) = ${week}         
                AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}     
                ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC, 
                CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                break;
            case 2:
                sql = `SELECT *
                    FROM tops
                    WHERE type_top = 'lunar'
                    AND type_item = 'vizita'
                    AND SUBSTRING_INDEX(ident_top, '.', 1) = ${week}
                    AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}
                    ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC,
                    CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
                break;
            case 3:
                sql = `SELECT *
                    FROM tops
                    WHERE type_top = 'lunar'
                    AND type_item = 'like'
                    AND SUBSTRING_INDEX(ident_top, '.', 1) = ${week}
                    AND SUBSTRING_INDEX(ident_top, '.', -1) = ${year}
                    ORDER BY CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) ASC,
                    CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) ASC;`;
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