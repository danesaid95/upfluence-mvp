import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login as brand user before each test
    await page.goto('/');
    await page.fill('input[type="email"]', 'sarah@fashionnova.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
  });

  test('should display brand dashboard stats correctly', async ({ page }) => {
    // Check stats cards are visible
    await expect(page.locator('text=Total Campaigns')).toBeVisible();
    await expect(page.locator('text=Active Campaigns')).toBeVisible();
    await expect(page.locator('text=Influencers')).toBeVisible();
    await expect(page.locator('text=Total Spend')).toBeVisible();
    
    // Check stats have values
    await expect(page.locator('text=12')).toBeVisible(); // Total campaigns
    await expect(page.locator('text=5')).toBeVisible();  // Active campaigns
  });

  test('should navigate to influencer search', async ({ page }) => {
    // Click on Search Influencers button
    await page.click('text=Search Influencers');
    
    // Should navigate to search page
    await page.waitForURL('**/search');
    await expect(page.locator('h1:has-text("Find Influencers")')).toBeVisible();
  });

  test('should show campaign management section', async ({ page }) => {
    // Check campaigns section
    await expect(page.locator('text=Active Campaigns')).toBeVisible();
    await expect(page.locator('text=Create Campaign')).toBeVisible();
    await expect(page.locator('text=View Analytics')).toBeVisible();
  });

  test('should display recent campaigns', async ({ page }) => {
    await expect(page.locator('text=Recent Campaigns')).toBeVisible();
    await expect(page.locator('text=Summer Collection Launch')).toBeVisible();
  });

  test('should handle sign out', async ({ page }) => {
    // Click sign out
    await page.click('text=Sign Out');
    
    // Should redirect to homepage
    await page.waitForURL('/');
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
  });
});

test.describe('Influencer Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as influencer user before each test
    await page.goto('/');
    await page.fill('input[type="email"]', 'sarah@lifestyle.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
  });

  test('should display influencer dashboard correctly', async ({ page }) => {
    await expect(page.locator('h1:has-text("Influencer Dashboard")')).toBeVisible();
    await expect(page.locator('text=Welcome, Sarah Johnson')).toBeVisible();
  });

  test('should show influencer stats', async ({ page }) => {
    // Check for influencer-specific stats
    await expect(page.locator('text=Total Followers')).toBeVisible();
    await expect(page.locator('text=Campaigns')).toBeVisible();
    await expect(page.locator('text=Earnings')).toBeVisible();
  });
});