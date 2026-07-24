import { Locator, Page, expect } from "@playwright/test";


export class LoginPage {

    //PROPERTIES
    readonly page: Page; 
    readonly usernameTextBox: Locator
    readonly passwordTextBox: Locator
    readonly loginButton: Locator

    //CONSTRUCTOR
    constructor(page: Page){

        this.page = page
        this.usernameTextBox = page.locator('[data-test="username"]')
        this.passwordTextBox = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')

    }

    //METHODS

    async navigate(){
        await this.page.goto("https://www.saucedemo.com/")
    }

    async logIn(usernameVal:string, passwordVal:string){ 
        await this.usernameTextBox.fill(usernameVal)
        await this.passwordTextBox.fill(passwordVal) 
        await this.loginButton.click() 
    }

}