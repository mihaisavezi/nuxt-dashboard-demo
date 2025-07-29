import usersData from "~/assets/data/users.json";
import type { User } from "~/types";

export default defineEventHandler(async (event) => {
  // Only accept POST requests
  if (event.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password required",
    });
  }

  // Find user with matching email and password
  const foundUser = usersData.find(
    (user: User) => user.email === email && user.password === password
  );

  if (foundUser) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = foundUser;
    return {
      success: true,
      user: userWithoutPassword,
    };
  }

  return {
    success: false,
    message: "Invalid credentials",
  };
});
