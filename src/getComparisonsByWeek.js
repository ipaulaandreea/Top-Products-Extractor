import { connection } from "./db.js";



export async function generateComparisonsByWeek(entry) {
    const [period, year] = entry['ident_top'].split('.').map(part => parseInt(part, 10));
    try {
        let sql = `
            SELECT * FROM tops WHERE type_top = 'saptamanal' AND 
            CAST(SUBSTRING_INDEX(ident_top, '.', -1) AS UNSIGNED) = ?  AND  
            CAST(SUBSTRING_INDEX(ident_top, '.', 1) AS UNSIGNED) <= ? AND 
            type_item = ? AND prod = ? 
            ORDER BY CAST(ident_top AS UNSIGNED) DESC LIMIT 2;
        `;

        const queryParams = [year, period, entry['type_item'], entry["prod"]];

        return new Promise((resolve, reject) => {
            connection.query(sql, queryParams, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (results.length === 0) {
                    resolve(null);
                    return;
                }

                if (results.length === 1) {
                    let result = results[0];
                    result['comparison'] = 'N/A';
                    resolve(result);
                    return;
                }
                let comparisonResult = '';
                const currentLine = parseInt(entry["line"], 10);
                const previousLine = parseInt(results[1]["line"], 10);

                if (currentLine > previousLine) {
                    comparisonResult = "In scadere";
                } else if (currentLine < previousLine) {
                    comparisonResult = "In crestere";
                } else if (currentLine === previousLine) {
                    comparisonResult = "Stagnare";
                }

                let result = results[0];
                result['comparison'] = comparisonResult;

                resolve(result);
            });
        });

    } catch (error) {
        throw new Error(`Error generating comparisons: ${error.message}`);
    }
}
