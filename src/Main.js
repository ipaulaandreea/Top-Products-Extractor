import {dummyDataGenerator} from "./dummyDataGenerator.js";
import {getNewestLatestYears} from "./getNewestLatestYears.js";
import {Action} from "./Action.js";
import {MoveToDb} from "./MoveToDb.js";
import {Period} from "./Period.js";
import {connection} from "./db.js";


class Main {

    async generateDummyData() {
        await dummyDataGenerator();
    }

    async generateTops(){
        try {
        const { newest, oldest } = await getNewestLatestYears();
            let action = new Action();
            let moveToDB = new MoveToDb();

            ///Get tops by year;
            for (let year = oldest; year <= newest; year++) {
                for (let type = 1; type <= 3; type++) {
                    let period = new Period(year);
                    let topYear = await (action.getTop(period, type));
                    await moveToDB.moveToDb(topYear);
                }
            }
            ///Get tops by month;
            for (let year = oldest; year <= newest; year++) {
                for (let month = 1; month <= 12; month++) {
                    for (let type = 1; type <= 3; type++) {
                        let period = new Period(year, null, month);
                        let topMonth = await (action.getTop(period, type));
                        await moveToDB.moveToDb(topMonth);
                    }
                }
            }
            ///Get tops by week;
            for (let year = oldest; year <= newest; year++) {
                for (let week = 1; week <= 52; week++) {
                    for (let type = 1; type <= 3; type++) {
                        let period = new Period(year, week, null);
                        let topWeek = await (action.getTop(period, type));
                        await moveToDB.moveToDb(topWeek);
                    }
                }
            }
        } catch (err) {
            console.error('Error executing queries:', err);
        } finally {
            connection.end();
        }

    }

    async generateComparisons() {

    };

}