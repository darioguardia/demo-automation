import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

test("Verification of Cart TEST2", async ({ page }) => {


    const loginPageObj = new LoginPage(page);
    await loginPageObj.navigate();
    await page.screenshot({
        path: "screenshots/00-pre-login.png",
        fullPage: true
    });
    await loginPageObj.logIn("standard_user", "secret_sauce");

    // Captura después del login
    await page.screenshot({
        path: "screenshots/01-login-exitoso.png",
        fullPage: true
    });

    const homePageObj = new HomePage(page);

    await expect(homePageObj.homePageHeading).toHaveText("Swag Labs");
    await homePageObj.backpackAddToCart();
    await expect(homePageObj.cartIcon).toHaveText("1");
    await expect(homePageObj.backpackRemoveButton).toBeVisible();
    await homePageObj.goToCart();

    // Captura del carrito con el producto agregado
    await page.screenshot({
        path: "screenshots/02-producto-agregado.png",
        fullPage: true
    });

    const cartPageObj = new CartPage(page);

    await expect(cartPageObj.backpackItemLink).toHaveText("Sauce Labs Backpack");

   
});