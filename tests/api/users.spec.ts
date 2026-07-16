import { test, expect } from '@playwright/test';

const baseURL = 'https://reqres.in';
const requestHeaders: Record<string, string> = {
  'x-api-key': 'free_user_3GaDy3K5J24VMdba7B85uYqp9Qq',
};

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface SupportInfo {
  url: string;
  text: string;
}

interface UsersListResponse {
  page: number;
  data: User[];
  per_page: number;
  total: number;
  total_pages: number;
  support: SupportInfo;
}

interface CreateUserRequest {
  name: string;
  job: string;
}

interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

test('GET /api/users?page=2 - verifies pagination and user list', async ({ request }) => {
  // Gọi endpoint để lấy danh sách user ở trang 2.
  const response = await request.get(`${baseURL}/api/users?page=2`, {
    headers: requestHeaders,
  });

  // Kiểm tra mã trạng thái và định dạng response.
  expect(response.status()).toBe(200);

  const body = (await response.json()) as UsersListResponse;

  expect(body.page).toBe(2);
  expect(body.per_page).toBeGreaterThan(0);
  expect(body.total).toBeGreaterThan(0);
  expect(body.total_pages).toBeGreaterThan(0);
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);

  const firstUser = body.data[0];
  expect(firstUser.id).toBeGreaterThan(0);
  expect(firstUser.email).toContain('@');
  expect(firstUser.first_name).toBeTruthy();
  expect(firstUser.last_name).toBeTruthy();
  expect(firstUser.avatar).toContain('https://');
  expect(body.support.url).toContain('https://');
  expect(body.support.text).toBeTruthy();
});

test('POST /api/users - creates a user and returns created data', async ({ request }) => {
  // Tạo payload cho user mới.
  const payload: CreateUserRequest = {
    name: 'morpheus',
    job: 'leader',
  };

  const response = await request.post(`${baseURL}/api/users`, {
    data: payload,
    headers: requestHeaders,
  });

  // Kiểm tra trạng thái tạo thành công và dữ liệu trả về.
  expect(response.status()).toBe(201);

  const body = (await response.json()) as CreateUserResponse;
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
  expect(body.id).toBeTruthy();
  expect(body.createdAt).toBeTruthy();
});

test('DELETE /api/users/2 - deletes an existing user', async ({ request }) => {
  // Gửi yêu cầu xóa user có id 2.
  const response = await request.delete(`${baseURL}/api/users/2`, {
    headers: requestHeaders,
  });

  // Kiểm tra server trả về mã xóa thành công.
  expect(response.status()).toBe(204);
  expect(await response.text()).toBe('');
});
