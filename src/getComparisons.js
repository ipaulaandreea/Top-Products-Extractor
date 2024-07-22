import {FetchFromDb} from "./FetchFromDb.js";
import {Result} from "./Result.js";
import {Comparator} from "./Comparator.js";

export async function getComparisons(period, type_item) {
    console.log("Top 100:", period.periodType +"  "+ type_item +"pentru:", period);
    let comparisonArr = [];
try {
    const fetchFromDb = new FetchFromDb(
        period.periodType,
        period.year,
        period.month,
        period.week,
        type_item
    );
    let entries = await fetchFromDb.fetch();
    for (let entry of entries) {
        let result = new Result(
            entry["line"],
            entry["type_item"],
            entry["type_top"],
            entry["ident_top"],
            entry["sumofvalues"],
            entry["prod"]
        );
        comparisonArr.push(result);
    }
    const comparator = new Comparator();
    for (let entry of comparisonArr) {
        let comparedEntry = await comparator.generateComparison(entry);
        console.log(`${comparedEntry.line} Produsul #${comparedEntry.prod} - ${comparedEntry.comparison}`);

    }
}
    catch (err) {
        console.error('Error executing queries:', err);
    }
}