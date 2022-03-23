import { getUser as getUserFromDb, User } from "./database/database.ts";

export async function getUser(headers: Headers): Promise<User | undefined> {
  if (headers.get("Snowflake") == null) return undefined;

  return await getUserFromDb(headers.get("Snowflake")!);
}
