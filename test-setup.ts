import { vi } from "vitest";

// Mock all Nuxt composables to avoid Nitro initialization
vi.mock("#app", () => ({
  useUserSession: vi.fn(() => ({
    data: { value: null },
    loggedIn: { value: false },
    refresh: vi.fn(),
  })),
  navigateTo: vi.fn(),
  $fetch: vi.fn(),
  useRequestEvent: vi.fn(),
  useHead: vi.fn(),
  useNuxtApp: vi.fn(() => ({
    provide: vi.fn(),
    hook: vi.fn(),
  })),
  useRuntimeConfig: vi.fn(() => ({
    public: {},
  })),
}));

// Mock global functions
global.$fetch = vi.fn();
global.navigateTo = vi.fn();

// Mock defineStore to avoid Pinia initialization issues
vi.mock("pinia", async () => {
  const actual = await vi.importActual("pinia");
  return {
    ...actual,
    defineStore: vi.fn(),
  };
});
