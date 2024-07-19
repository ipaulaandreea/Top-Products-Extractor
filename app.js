import {getNewestLatestYears} from './src/getNewestLatestYears.js';
import {getTop100ByYear} from "./src/getTop100ByYear.js";
import {getTop100ByMonth} from "./src/getTop100ByMonth.js";
import {getTop100ByWeek} from "./src/getTop100ByWeek.js";
import {moveToDb_yearly} from "./src/moveToDb_yearly.js";
import {moveToDb_weekly} from "./src/moveToDb_weekly.js";
import {connection} from './src/db.js'
import {moveToDb_monthly} from "./src/moveToDb_monthly.js";


async function main() {
    try {
        const { newest, oldest } = await getNewestLatestYears();
        for (let year = oldest; year <= newest; year++) {
            for (let type = 1; type <= 3; type++) {
                const top100year = await (getTop100ByYear(year, type));
                console.log(top100year);
                await moveToDb_yearly(top100year, year, type);
            }
        }

        for (let year = oldest; year <= newest; year++) {
            for (let month = 1; month <= 12; month++) {
                for (let type = 1; type <= 3; type++) {
                    const top100month = await (getTop100ByMonth(year, month, type));
                    console.log(top100month);
                    await moveToDb_monthly(top100month, year, type);
                }

            }
        }

        for (let year = oldest; year <= newest; year++) {
            for (let week = 1; week <= 52; week++) {
                for (let type = 1; type <= 3; type++) {
                    const top100week = await (getTop100ByWeek(year, week, type));
                    console.log(top100week);
                    await moveToDb_weekly(top100week, year, type);
                }
            }
        }


    } catch (err) {
        console.error('Error executing queries:', err);
    } finally {
        connection.end();
    }

}

main();