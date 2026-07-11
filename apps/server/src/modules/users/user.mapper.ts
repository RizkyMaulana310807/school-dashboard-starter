import { User } from "@prisma/client";

export function toUserResponse(user: User) {
  const { password, ...safeUser } = user;

  return safeUser;
}

export function toUsersResponse(users: User[]) {
  return users.map(toUserResponse);
}