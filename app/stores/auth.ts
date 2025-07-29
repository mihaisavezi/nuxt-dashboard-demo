import { defineStore } from "pinia";
import type { User } from "~/types"; // ✅ Fixed import path

export const useAuthStore = defineStore("auth", () => {
  // Use Nuxt Auth Utils session - consistent with docs
  const { session, loggedIn, fetch: refresh } = useUserSession(); // ✅ Added refresh

  // Computed properties with safe access
  const user = computed(() => session.value?.user || null);
  const isLoggedIn = computed(() => loggedIn.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (response.success) {
        // ✅ Use proper refresh method from composable
        await refresh();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      await navigateTo("/login");
    } catch (error) {
      console.error("Logout error:", error);
      await navigateTo("/login");
    }
  };

  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    login,
    logout,
  };
});
