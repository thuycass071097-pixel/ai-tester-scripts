import { test as base, expect, type Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

// AuthFixtures định nghĩa các fixture tuỳ chỉnh mà test có thể dùng.
// Ở đây, loggedInPage là một fixture có kiểu Page, nghĩa là nó sẽ trả về
// một đối tượng page đã được đăng nhập sẵn cho mỗi test.
interface AuthFixtures {
  loggedInPage: Page;
}

// Generic type <T> ở đây giúp fixture mở rộng base test một cách an toàn,
// giữ kiểu dữ liệu của các fixture gốc và thêm fixture mới vào cùng một model.
export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await use(page);
  }
});

export { expect };
