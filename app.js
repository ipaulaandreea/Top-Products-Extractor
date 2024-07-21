import {getNewestLatestYears} from './src/getNewestLatestYears.js';
import {connection} from './src/db.js'
import {dummyDataGenerator} from "./src/dummyDataGenerator.js";
import {getTopsByYear, getTopsByMonth, getTopsByWeek} from "./src/getTops.js";
import {generateComparisonsByYear} from "./src/generateComparisonsByYear.js";
import {generateComparisonsByMonth} from "./src/generateComparisonsByMonth.js";
import {generateComparisonsByWeek} from "./src/getComparisonsByWeek.js";


async function main() {
    let comparisonsYearly = [];
    let comparisonsMonthly = [];
    let comparisonsWeekly = [];

    try {

        const { newest, oldest } = await getNewestLatestYears();


        // Top 100 by year
        for (let year = oldest; year <= newest; year++) {
            for (let type = 1; type <= 3; type++) {
                let results = await getTopsByYear(year, type);
                for (let result of results) {
                    let updatedResults = await generateComparisonsByYear(result);
                    comparisonsYearly.push(updatedResults);
                }
                console.log(`Top 100 ${type} for year ${year}`);
                comparisonsYearly.forEach(comparison => {
                    console.log(`${comparison.line} Produsul #${comparison.prod} - ${comparison.comparison}`);
                });
            }
        }

        return comparisonsYearly;

        // Top 100 by month
        for (let year = oldest; year <= newest; year++) {
            for (let month = 1; month <= 12; month++) {
                for (let type = 1; type <= 3; type++) {
                    let results = await getTopsByMonth(year, month, type);
                    for (let result of results) {
                        let updatedResults = await generateComparisonsByMonth(result);
                        comparisonsMonthly.push(updatedResults);
                    }
                    console.log(`Top 100 ${type} for month ${month} year ${year}`);

                    comparisonsMonthly.forEach(comparison => {
                        console.log(`${comparison.line} Produsul #${comparison.prod} - ${comparison.comparison}`);
                    });
                }
            }
        }

        return comparisonsMonthly;


        // Top 100 by week
        for (let year = oldest; year <= newest; year++) {
            for (let week = 1; week <= 52; week++) {
                for (let type = 1; type <= 3; type++) {
                    console.log(`Top 100 ${type} for week ${week} year ${year}`);
                    let results = await getTopsByWeek(year, week, type);

                    if (results.length === 0) {
                        continue;
                    }

                    let comparisonsWeekly = [];

                    for (let result of results) {
                        let updatedResults = await generateComparisonsByWeek(result);
                        if (updatedResults !== null) {
                            comparisonsWeekly.push(updatedResults);
                        }
                    }

                    comparisonsWeekly.forEach(comparison => {
                        console.log(`${comparison.line} Produsul #${comparison.prod} - ${comparison.comparison}`);
                    });
                }
            }
        }

        return comparisonsWeekly;

    } catch (err) {
        console.error('Error executing queries:', err);
    } finally {
        connection.end();
    }

}

main();

// const main  = new Main();
//
// main.generateTops();
// main.generateComparisons();
