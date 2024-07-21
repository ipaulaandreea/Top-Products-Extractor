export class TopLine {
    rank;
    product_id;
    type_item;
    type_top;
    ident_top;
    sum_of_values;

    constructor(
        rank,
        type_item,
        type_top,
        ident_top,
        sum_of_values,
        product_id
    ) {
        this.rank = rank;
        this.product_id = product_id;
        this.type_item = this.setTypeItem(type_item);
        this.type_top = type_top;
        this.ident_top = ident_top;
        this.sum_of_values = sum_of_values;
    }

    setTypeItem(type_item) {
        switch(type_item){
            case 1:
                return 'vanzare';
            case 2:
                return 'vizita';
            case 3:
                return 'like';
        }
    }



}