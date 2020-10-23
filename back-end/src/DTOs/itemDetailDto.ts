import {priceDto} from "./priceDto";
import {itemDto} from "./itemDto";

export class itemDetailDto extends itemDto {
    sold_quantity: number;
    description: any;

    constructor(id: string, title: string, price: priceDto, picture: string, condition: string, free_shipping: string, sold_quantity : number, description: string) {
        super(id, title, price, picture, condition, free_shipping);
        this.sold_quantity = sold_quantity;
        this.description = description
    }
}