import { z } from "zod";
import usersData from "~/assets/data/users.json";
import type { User } from "~/types";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  // Find user with matching credentials
  const foundUser = usersData.find(
    (user: User) => user.email === email && user.password === password
  );

  if (foundUser) {
    // Remove password from session data
    const { password: _, ...userWithoutPassword } = foundUser;

    // Set user session using Nuxt Auth Utils
    await setUserSession(event, {
      user: userWithoutPassword,
      loggedInAt: new Date(),
    });

    return { success: true, user: userWithoutPassword };
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials",
  });
});
