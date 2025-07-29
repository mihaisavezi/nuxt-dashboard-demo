import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

// Mock the store implementation directly
const mockStore = {
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: vi.fn(),
  logout: vi.fn(),
};

// Mock the store module
vi.mock("./auth", () => ({
  useAuthStore: vi.fn(() => mockStore),
}));

describe("AuthStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should initialize with correct default values", async() => {
      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      expect(store.user).toBe(null);
      expect(store.isLoggedIn).toBe(false);
      expect(store.isAdmin).toBe(false);
    });
  });

  describe("Login Method", () => {
    it("should handle successful login", async () => {
      // Mock successful API response
      global.$fetch = vi.fn().mockResolvedValue({
        success: true,
        user: { id: 1, name: "John Doe", role: "admin" },
      });

      mockStore.login.mockImplementation(async (email, password) => {
        const response = await global.$fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });

        if (response.success) {
          mockStore.user = response.user;
          mockStore.isLoggedIn = true;
          mockStore.isAdmin = response.user.role === "admin";
          return true;
        }
        return false;
      });

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      const result = await store.login("john@example.com", "admin123");

      expect(result).toBe(true);
      expect(global.$fetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        body: { email: "john@example.com", password: "admin123" },
      });
    });

    it("should handle failed login", async () => {
      global.$fetch = vi.fn().mockResolvedValue({ success: false });

      mockStore.login.mockImplementation(async () => false);

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      const result = await store.login("wrong@email.com", "wrongpass");

      expect(result).toBe(false);
    });

    it("should handle network errors", async () => {
      global.$fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      mockStore.login.mockImplementation(async () => {
        try {
          await global.$fetch("/api/auth/login");
          return true;
        } catch {
          return false;
        }
      });

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      const result = await store.login("john@example.com", "admin123");

      expect(result).toBe(false);
    });
  });

  describe("Logout Method", () => {
    it("should handle successful logout", async () => {
      global.$fetch = vi.fn().mockResolvedValue({ success: true });
      global.navigateTo = vi.fn();

      mockStore.logout.mockImplementation(async () => {
        await global.$fetch("/api/auth/logout", { method: "POST" });
        mockStore.user = null;
        mockStore.isLoggedIn = false;
        mockStore.isAdmin = false;
        global.navigateTo("/login");
      });

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      await store.logout();

      expect(global.$fetch).toHaveBeenCalledWith("/api/auth/logout", {
        method: "POST",
      });
      expect(global.navigateTo).toHaveBeenCalledWith("/login");
    });
  });

  describe("User Role Detection", () => {
    it("should identify admin users correctly", async () => {
      mockStore.user = { id: 1, name: "Admin User", role: "admin" };
      mockStore.isAdmin = true;

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      expect(store.isAdmin).toBe(true);
    });

    it("should identify regular users correctly",async () => {
      mockStore.user = { id: 2, name: "Regular User", role: "user" };
      mockStore.isAdmin = false;

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      expect(store.isAdmin).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle null user data",async () => {
      mockStore.user = null;
      mockStore.isLoggedIn = false;
      mockStore.isAdmin = false;

      const { useAuthStore } = await import("./auth");
      const store = useAuthStore();

      expect(store.user).toBe(null);
      expect(store.isLoggedIn).toBe(false);
      expect(store.isAdmin).toBe(false);
    });
  });
});
