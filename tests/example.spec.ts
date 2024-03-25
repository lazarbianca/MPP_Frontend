import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000/paintings');
});
test('has title', async ({page}) => {
    await expect(page).toHaveTitle(/Online Art Gallery/);
});

test('add works correctly', async ({page}) => {
    // Click add button
    await page.click('[aria-label="add"]');
    await expect(page.getByRole('dialog')).toBeVisible();

    // Simulate user input in the dialog's input fields
    await page.fill('input[name="title"]', 'The Kiss');
    await page.fill('input[name="author"]', 'Gustav Klimt');
    await page.fill(
        'input[name="imageUrl"]',
        'https://lh3.googleusercontent.com/7aJyS2Nd7c8oCJKmfXlmM-rnSnLMY0ykfBFOP8N3OjV6M4hbhS_NEg8tH6SJDfvl=s1200',
    );
    await page.fill('input[name="year"]', '1908');
    await page.fill(
        'input[name="museum"]',
        'Österreichische Galerie Belvedere, Vienna, Austria',
    );
    const comboboxElement = await page.$('[role="combobox"]');
    // Assert that the combobox element exists
    expect(comboboxElement).not.toBeNull();
    // Click on the combobox element to open the dropdown
    await comboboxElement?.click();

    // Wait for the dropdown options to appear (if needed)
    await page.waitForSelector('[role="option"]');

    // Find and click on the option 'Baroque'
    const optionBaroque = await page.waitForSelector(
        '[role="option"]:has-text("Baroque")',
    );
    await optionBaroque.click();

    // Click the Submit button
    await page.click('button[type="submit"]');

    // Scroll to the bottom of the page
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Check if the item is added
    //const newItemTitle = await page.textContent('.painting-item .title');
    const newItemTitle = await page.textContent('html');
    expect(newItemTitle).toContain('The Kiss');
});

test('add-cancel closes add dialog', async ({page}) => {
    // Click add button
    await page.click('[aria-label="add"]');
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click the Cancel button
    await page.click('button[aria-label="close"]');

    // Check if the dialog is closed
    const isDialogClosed = await page.isVisible('.dialog');
    expect(isDialogClosed).toBe(false);
});

test('detail page is opened', async ({page}) => {
    //Click on a painting card
    // Find the card media image by painting title and click on it
    await page.click(`[aria-label="card-action-area-1"]`);
    await page.waitForURL(/http:\/\/localhost:3000\/paintings\/1/);
    // Assert that you are on the correct detail page
    // Using URL
    const currentURL = page.url();
    expect(currentURL).toContain('/paintings/1');

    // using museum name (appears only for painting Mona Lisa, and does
    // not appear in overview page)
    const newItemTitle = await page.textContent('html');
    expect(newItemTitle).toContain('Louvre Museum');
});

test('delete works properly', async ({page}) => {
    // Find the card delete icon by area label and click on it
    await page.click(`[aria-label="delete-1"]`);
    await expect(page.getByRole('dialog')).toBeVisible();

    // Search for Confirmation word
    let newItemTitle = await page.textContent('html');
    expect(newItemTitle).toContain('Confirmation');

    // Click yes button
    await page.click('[aria-label="yes"]');

    // Check if delete worked
    newItemTitle = await page.textContent('html');
    expect(newItemTitle).not.toContain('Mona Lisa');
});

test('delete-cancel closes dialog', async ({page}) => {
    // Find the card delete icon by area label and click on it
    await page.click(`[aria-label="delete-1"]`);
    await expect(page.getByRole('dialog')).toBeVisible();

    // Search for Confirmation word
    const newItemTitle = await page.textContent('html');
    expect(newItemTitle).toContain('Confirmation');

    // Click no button
    await page.click('[aria-label="no"]');

    // Check if the dialog is closed
    const isDialogClosed = await page.isVisible('.dialog');
    expect(isDialogClosed).toBe(false);
});

test('edit works properly', async ({page}) => {
    // Find the card edit icon by area label and click on it
    await page.click(`[aria-label="edit-1"]`);
    await expect(page.getByRole('dialog')).toBeVisible();

    // Change title
    await page.fill('input[name="title"]', 'Gioconda');

    // Click the Submit button
    await page.click('button[type="submit"]');

    const newItemTitle = await page.textContent('html');
    expect(newItemTitle).not.toContain('Mona Lisa');
    expect(newItemTitle).toContain('Gioconda');
});
// to run : turn server on and use one of these -
// npx playwright test --ui
// npx playwright test --project chromium
