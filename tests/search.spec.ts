import { test, expect } from '@playwright/test';

test.describe('Influencer Search', () => {
  test.beforeEach(async ({ page }) => {
    // Login as brand user and navigate to search
    await page.goto('/');
    await page.fill('input[type="email"]', 'sarah@fashionnova.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await page.click('text=Search Influencers');
    await page.waitForURL('**/search');
  });

  test('should display search page correctly', async ({ page }) => {
    await expect(page.locator('h1:has-text("Find Influencers")')).toBeVisible();
    await expect(page.locator('text=Search Filters')).toBeVisible();
  });

  test('should show filter options', async ({ page }) => {
    // Check filter dropdowns
    await expect(page.locator('select').first()).toBeVisible(); // Category
    await expect(page.locator('text=Platform')).toBeVisible();
    await expect(page.locator('text=Followers')).toBeVisible();
    await expect(page.locator('text=Location')).toBeVisible();
  });

  test('should display influencer cards', async ({ page }) => {
    // Check for influencer cards
    await expect(page.locator('text=Sarah Johnson')).toBeVisible();
    await expect(page.locator('text=@sarah.lifestyle')).toBeVisible();
    await expect(page.locator('text=Mike Chen')).toBeVisible();
    await expect(page.locator('text=@mikeeats')).toBeVisible();
    await expect(page.locator('text=Emma Wilson')).toBeVisible();
    await expect(page.locator('text=@emmafitness')).toBeVisible();
  });

  test('should show influencer details in cards', async ({ page }) => {
    // Check for follower counts and engagement rates
    await expect(page.locator('text=125K followers')).toBeVisible();
    await expect(page.locator('text=4.8%')).toBeVisible(); // Engagement rate
    await expect(page.locator('text=$1,200/post')).toBeVisible();
  });

  test('should show category tags', async ({ page }) => {
    // Check for category tags
    await expect(page.locator('text=Fashion')).toBeVisible();
    await expect(page.locator('text=Lifestyle')).toBeVisible();
    await expect(page.locator('text=Food')).toBeVisible();
    await expect(page.locator('text=Cooking')).toBeVisible();
    await expect(page.locator('text=Fitness')).toBeVisible();
    await expect(page.locator('text=Health')).toBeVisible();
  });

  test('should have contact and profile buttons', async ({ page }) => {
    // Check for action buttons
    await expect(page.locator('button:has-text("Contact")')).toBeVisible();
    await expect(page.locator('button:has-text("View Profile")')).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    // Select Fashion category
    await page.selectOption('select', 'Fashion');
    
    // Should still show relevant influencers
    await expect(page.locator('text=Sarah Johnson')).toBeVisible();
    await expect(page.locator('text=Fashion')).toBeVisible();
  });

  test('should filter by platform', async ({ page }) => {
    // Find and select Instagram platform
    const platformSelect = page.locator('select').nth(1);
    await platformSelect.selectOption('Instagram');
    
    // Should show influencers with Instagram presence
    await expect(page.locator('text=Instagram')).toBeVisible();
  });

  test('should filter by follower count', async ({ page }) => {
    // Select follower range
    const followerSelect = page.locator('select').nth(2);
    await followerSelect.selectOption('100K - 500K');
    
    // Should filter results appropriately
    await expect(page.locator('text=125K followers')).toBeVisible();
  });

  test('should navigate back to dashboard', async ({ page }) => {
    // Click back to dashboard link
    await page.click('text=← Back to Dashboard');
    
    // Should navigate back to dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1:has-text("Brand Dashboard")')).toBeVisible();
  });

  test('should show verification badges', async ({ page }) => {
    // Check for verified badges
    await expect(page.locator('text=Verified')).toBeVisible();
    await expect(page.locator('text=Available')).toBeVisible();
  });
});