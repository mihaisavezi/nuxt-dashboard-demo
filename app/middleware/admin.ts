export default defineNuxtRouteMiddleware(async () => {
  // Server-side check
  // if (import.meta.server) {
  //   try {
  //     const event = useRequestEvent();
  //     const session = await getUserSession(event);

  //     if (!session?.user || session.user.role !== "admin") {
  //       throw createError({
  //         statusCode: 403,
  //         statusMessage: "Access denied. Admin privileges required.",
  //       });
  //     }
  //   } catch (error) {
  //     throw createError({
  //       statusCode: 403,
  //       statusMessage: "Access denied. Admin privileges required.",
  //     });
  //   }
  // }

  // Client-side check
  if (import.meta.client) {
    const { session } = useUserSession();
    console.log("🚀 ~ session:", session)

    // Wait for session to be available
    await new Promise((resolve) => {
      const checkSession = () => {
        if (session.value !== undefined) {
          resolve(true);
        } else {
          setTimeout(checkSession, 10);
        }
      };
      checkSession();
    });

    if (!session.value?.user || session.value.user.role !== "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Access denied. Admin privileges required.",
      });
    }
  }
});
