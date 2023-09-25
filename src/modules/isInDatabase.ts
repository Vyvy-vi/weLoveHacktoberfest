import { Bot } from "../interfaces/Bot";
import { errorHandler } from "../utils/errorHandler";

interface params {
  repo: string;
  owner: string;
  userId: string;
}

/**
 * Checks if the database contains the specified project for the user.
 * Creates it if not.
 *
 * @param {Bot} client The bot's Discord instance.
 * @param {params} opts The userId, repo, and owner.
 * @returns {boolean} True if already present, false if not. Null on error.
 */
export const isInDatabase = async (
  client: Bot,
  opts: params
): Promise<boolean | null> => {
  try {
    const exists = await client.db.links.findUnique({
      where: {
        userId_repo_owner: opts,
      },
    });
    if (exists) {
      return true;
    }
    await client.db.links.create({
      data: opts,
    });
    return false;
  } catch (err) {
    await errorHandler("isInDatabase", err);
    return null;
  }
};