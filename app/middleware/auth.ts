export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  // Redirect to login if not authenticated
  if (!loggedIn.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  // Redirect to home if already logged in and trying to access login
  if (loggedIn.value && to.path === "/login") {
    return navigateTo("/");
  }
});
