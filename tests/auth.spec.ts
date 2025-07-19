import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if login form is visible
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login as brand user successfully', async ({ page }) => {
    await page.goto('/');
    
    // Fill login form
    await page.fill('input[type="email"]', 'sarah@fashionnova.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect and check dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1:has-text("Brand Dashboard")')).toBeVisible();
    await expect(page.locator('text=Welcome, Sarah Miller')).toBeVisible();
  });

  test('should login as influencer user successfully', async ({ page }) => {
    await page.goto('/');
    
    // Fill login form
    await page.fill('input[type="email"]', 'sarah@lifestyle.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for redirect and check dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1:has-text("Influencer Dashboard")')).toBeVisible();
    await expect(page.locator('text=Welcome, Sarah Johnson')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Fill login form with invalid credentials
    await page.fill('input[type="email"]', 'invalid@email.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should redirect to login when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login
    await page.waitForURL('**/');
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
  });
});