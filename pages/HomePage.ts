import { Locator, Page, expect } from "@playwright/test";


export class HomePage {

    //PROPERTIES
    readonly page: Page;
    readonly homePageHeading: Locator
    readonly backpackAddToCartButton: Locator
    readonly backpackRemoveButton: Locator
    readonly cartIcon: Locator

    //CONSTRUCTOR
    constructor(page: Page){

        this.page = page
        this.homePageHeading = page.getByText('Swag Labs')
        this.backpackAddToCartButton = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']")
        this.backpackRemoveButton = page.locator("//button[@id='remove-sauce-labs-backpack']")
        this.cartIcon = page.locator("//a[@class='shopping_cart_link']")

    }

    //METHODS

    async goToCart(){
        await this.cartIcon.click()
    }

    async backpackAddToCart(){ 
        await this.backpackAddToCartButton.click()
    }

}