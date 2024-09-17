import test, { expect } from '@playwright/test';

test('User signs in', async ({ page }) => {
	await page.route('*/**/auth/login', async (route) => {
		await route.fulfill({
			status: 200
		});
	});

	await page.goto('/');
	await page.getByRole('textbox', { name: 'Name' }).fill('Testy McTester');
	await page.getByRole('textbox', { name: 'Email' }).fill('TestyMcTester@example.com');
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByRole('heading', { name: 'Fetch a Pet!', exact: true })).toBeVisible();
});
