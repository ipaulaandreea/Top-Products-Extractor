export class Period {
    year;
    week;
    month;
    periodType;

    constructor(year, week = null, month = null) {
        this.year = year;
        this.week = week;
        this.month = month;

        this.periodType = this.getPeriodType();
    }

    getPeriodType() {
        if (this.week === null && this.month === null) {
            return 'anual';
        }

        if (this.week !== null) {
            return 'saptamanal';
        }

        return 'lunar';
    }
}