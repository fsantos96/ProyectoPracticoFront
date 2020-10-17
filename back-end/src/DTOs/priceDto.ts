export class priceDto {
    amount: number;
    currency: string;
    decimals: number;

    constructor(amount: number, currency: string, decimals:number=0) {
        this.amount = amount;
        this.currency = currency;
        this.decimals = decimals;
    }
}