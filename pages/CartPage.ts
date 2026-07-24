import { Locator, Page, expect } from "@playwright/test";


export class CartPage {

    //PROPERTIES
    readonly page: Page; 
    readonly backpackItemLink: Locator
 

    //CONSTRUCTOR
    constructor(page: Page){
        this.page = page
        this.backpackItemLink = page.locator('[data-test="item-4-title-link"]')
    }


}