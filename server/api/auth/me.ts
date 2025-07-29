export default defineEventHandler(async (event) => {
  try {
    // Get user session (this should work with nuxt-auth-utils)
    const session = await getUserSession(event);

    if (session && session.user) {
      return { user: session.user };
    }
  } catch (error) {
    // Session doesn't exist or is invalid
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Not authenticated",
  });
});
