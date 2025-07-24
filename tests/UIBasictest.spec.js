const {test, expect} = require('@playwright/test');

test('Browser context Playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator("[name='password']");
    const signIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill('Rajeshekhar');
    await password.fill('Password');
    await page.locator('#terms').click();
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning")
    await signIn.click();
    expect(await page.locator("div.card-body a").nth(0).innerText()).toContain("iphone");
    console.log(await page.locator("div.card-body a").last().textContent());

});

test('UI controls test', async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('#username');
    const password = page.locator("[name='password']");
    const documentLink = page.locator("[href*='documents-request']");
    await username.fill("rahulshettyacademy");
    await password.fill("learning")
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test('Child window handling', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    //Promise.all is used when all steps inside this are required to execute paralelly (synchronously)
    //The promises in js are 3 types: Pending, Rejected, Fulfilled.
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const domain = text.split("@")[1].split(" ")[0];
    //console.log(domain);
    await username.fill(domain);
    console.log(await username.textContent());



});