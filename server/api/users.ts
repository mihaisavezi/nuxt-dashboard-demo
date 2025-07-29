import usersData from "~/assets/data/users.json";
import type { User, UserPublic, UserStats } from "~/types";

export default defineEventHandler(async (event) => {
  // Require authentication for this endpoint
  const session = await requireUserSession(event);

  const query = getQuery(event);
  const { search, country, page = 1, limit = 10 } = query;

  // Rest of your existing logic...
  let filteredUsers = usersData as User[];

  if (search) {
    const searchTerm = search.toString().toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  if (country && country !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.country === country);
  }

  const pageNum = parseInt(page.toString());
  const limitNum = parseInt(limit.toString());
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limitNum);

  const publicUsers: UserPublic[] = paginatedUsers.map(
    ({ password, ...user }) => user
  );

  const stats: UserStats = {
    totalUsers: usersData.length,
    adminCount: usersData.filter((u) => u.role === "admin").length,
    userCount: usersData.filter((u) => u.role === "user").length,
  };

  return {
    data: publicUsers,
    total: filteredUsers.length,
    page: pageNum,
    limit: limitNum,
    stats,
    countries: [...new Set(usersData.map((u) => u.country))],
  };
});
