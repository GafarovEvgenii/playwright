const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, pass } = require("./user");

test.describe('Authorization', () => { 
  test("successfulAutorization", async () => {
    const browser = await chromium.launch({
      headless: false,
      slowMo: 2000});
    const page = await browser.newPage();
    await page.goto('https://netology.ru/?modal=sign_in');
    
  
    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();
    // Fill [placeholder="Email"]
    await  page.locator('[placeholder="Email"]').fill(email);
 
    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();
    // Fill [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').fill(pass);

    // Press Enter
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
      page.locator('[placeholder="Пароль"]').press('Enter')
    ]);

    expect(page.locator('text=Мои курсы и профессии Расписание занятий')).toBeVisible();
    await page.pause();
    await page.screenshot({
      path: './screenshots/Test1.png',
    });
    await page.close();
  });


  test("unsuccessfulAutorization", async () => {
    const browser = await chromium.launch({
      headless: false,
      slowMo: 2000});
    const page = await browser.newPage();
    await page.goto('https://netology.ru/?modal=sign_in');
    

    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();
    // Fill [placeholder="Email"]
    await  page.locator('[placeholder="Email"]').fill(email);

    // Click [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').click();
    // Fill [placeholder="Пароль"]
    await page.locator('[placeholder="Пароль"]').fill('12345');

    // Press Enter
    await Promise.all([
    page.locator('[placeholder="Пароль"]').press('Enter')
    ]);

    expect(page.locator('[data-testid="login-error-hint"]')).toContainText('Вы ввели неправильно логин или пароль');
    await page.pause();
    await page.screenshot({
      path: './screenshots/Test2.png',
  });
    await page.close();
  });


})
