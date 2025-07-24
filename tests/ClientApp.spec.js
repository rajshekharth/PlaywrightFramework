const {test, expect} = require('@playwright/test');

test('Client app full End to End test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("rajshekharth0208@gmail.com");
    await page.locator("#userPassword").fill("TestAccount@123");
    await page.locator("#login").click();

    //Verfy that home page is shown
    const homePageLocator = page.locator("[routerlink='/dashboard/']");
    await homePageLocator.waitFor();
    const isHomePageShown = await homePageLocator.isVisible();
    expect(isHomePageShown).toBeTruthy;

    //Add a item to the cart
    const itemToAdd = ["ZARA COAT 3","ADIDAS ORIGINAL"];
    const itemBody = page.locator(".card-body");
    await itemBody.nth(0).waitFor();
    let itemsAdded = 0;
    const noOfItemsOnPage = await itemBody.count();
    for (let i = 0; i< noOfItemsOnPage; i++) {
        const itemName = await itemBody.nth(i).locator("b").textContent();
        if(itemToAdd.includes(itemName)) {
            await itemBody.nth(i).locator("i[class*=fa-shopping-cart]").click();
            itemsAdded++;
        }
        if(itemsAdded == itemToAdd.length) {
            break;
        }

    }
    
    //Clear the cart
    const cartIcon = page.locator("[routerlink*='cart']");
    await cartIcon.click();
    await page.locator("div.cart ul").nth(0).waitFor();
    const noOfItemsInCart = await page.locator("div.cart ul").count();
    if(noOfItemsInCart == 0) {
        console.log("The cart is empty from beginning.")
        expect(true).toBeFalsy();
    } else {
        for(let i = 0; i < noOfItemsInCart; i++) {
            await page.locator("button.btn-danger").nth(i).click();
            console.log('Removed item: ' + (Number(i) + 1));
        }
        expect(page.locator("div[class='ng-star-inserted'] h1")).toHaveText("No Products in Your Cart !");
    }

})