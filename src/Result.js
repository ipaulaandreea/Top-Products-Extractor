export class Result {
    line
    type_item;
    type_top;
    ident_top;
    sumofvalues;
    prod;
    comparison;

    constructor(line, type_item, type_top, ident_top, sumofvalues, prod, comparison = null) {
        this.line = line;
        this.type_item = type_item;
        this.type_top = type_top;
        this.ident_top = ident_top;
        this.sumofvalues = sumofvalues;
        this.prod = prod;
    }

    setComparison(comparison) {
        this.comparison = comparison;
    }

}