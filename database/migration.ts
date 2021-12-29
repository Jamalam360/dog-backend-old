import * as database from "./database.ts";

export const migrate = async (): Promise<void> => {
  await database.default.users
    .find({
      loginCode: { $exists: false },
    })
    .forEach(async (user) => {
      await database.default.users.updateOne(
        { _id: user._id },
        { $set: { loginCode: database.getRandomLoginCode() } }
      );
    });

    await database.default.users
    .find({
        index: { $exists: false },
    })
    .forEach(async (user) => {
        await database.default.users.updateOne(
            { _id: user._id },
            { $set: { index: 0 } }
        );
    });
};
