import {authorDto} from "./authorDto";
import {itemDto} from "./itemDto";

export class itemResponseDto {
    author: authorDto;
    categories: Array<string>;
    items: Array<itemDto>;

    constructor(author: authorDto, categories: Array<string>, items:Array<itemDto>) {
        this.author = author;
        this.categories = categories;
        this.items = items;
    }
}