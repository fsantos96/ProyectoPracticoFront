import {priceDto} from "./priceDto";
import {itemDto} from "./itemDto";

export class itemListDto extends itemDto {
    address: string;

    constructor(id: string, title: string, price: priceDto, picture: string, condition: string, free_shipping: string, address: string) {
        super(id, title, price, picture, condition, free_shipping);
        this.address = address;
    }
}