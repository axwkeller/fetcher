import test, { expect } from '@playwright/test';
import { dogSearchResultFactory, dogFactory } from '../../factories/dog';

test.describe('User visits fetch page', () => {
	test('sees a list of dogs', async ({ page }) => {
		await page.route('**/dogs/search', async (route) => {
			const searchResult = dogSearchResultFactory.build({
				resultIds: ['1', '2', '3']
			});
			await route.fulfill({
				status: 200,
				body: JSON.stringify(searchResult),
				headers: { 'Content-Type': 'application/json' }
			});
		});

		await page.route('**/dogs', async (route) => {
			const dogs = [
				dogFactory.build({ id: '1', name: 'TestyDog1' }),
				dogFactory.build({ id: '2', name: 'TestyDog2' }),
				dogFactory.build({ id: '3', name: 'TestyDog3' })
			];
			await route.fulfill({
				status: 200,
				body: JSON.stringify(dogs),
				headers: { 'Content-Type': 'application/json' }
			});
		});

		await page.goto('/fetch');

		await expect(page.getByRole('heading', { name: 'Fetch a Pet!' })).toBeVisible();
		await expect(page.getByText('Loading')).not.toBeVisible();

		await expect(page.getByText('TestyDog1', { exact: true })).toBeVisible();
		await expect(page.getByText('TestyDog2', { exact: true })).toBeVisible();
		await expect(page.getByText('TestyDog3', { exact: true })).toBeVisible();
	});
});
