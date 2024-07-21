import { connection } from "./db.js";



export async function generateComparisonsByYear(entry) {
    try {
        let sql = `
            SELECT * 
            FROM tops 
            WHERE type_top = 'anual' 
              AND CAST(ident_top AS UNSIGNED) <= ? 
              AND type_item = ? 
              AND prod = ? 
            ORDER BY CAST(ident_top AS UNSIGNED) DESC 
            LIMIT 2;
        `;

        const queryParams = [parseInt(entry['ident_top'], 10), entry['type_item'], entry["prod"]];

        return new Promise((resolve, reject) => {
            connection.query(sql, queryParams, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (results.length < 2) {
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
