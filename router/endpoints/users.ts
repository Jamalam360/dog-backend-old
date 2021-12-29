import {
  ERROR,
  NOT_FOUND_CODE,
  SUCCESS,
  SUCCESS_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} from "../../constants.ts";
import { router } from "../routes.ts";
import { createUser, getUser, updateUser } from "../../database/database.ts";

router.get("/v0/user/new", async (ctx) => {
  const user = await createUser();
  if (user) {
    ctx.response.status = SUCCESS_CODE;
    ctx.response.body = {
      status: SUCCESS,
      snowflake: user.snowflake,
    };
  } else {
    ctx.response.status = INTERNAL_SERVER_ERROR_CODE;
    ctx.response.body = {
      status: ERROR,
      message: "Failed to get or create user",
    };
  }
});

router.get("/v0/user/:id", async (ctx) => {
  const user = await getUser(ctx.params.id as string);

  if (!user) {
    ctx.response.status = NOT_FOUND_CODE;
    ctx.response.body = {
      status: ERROR,
      message: "Unknown User Snowflake",
    };
  } else {
    ctx.response.status = SUCCESS_CODE;
    ctx.response.body = {
      status: SUCCESS,
      snowflake: user.snowflake,
      votedOn: user.votedOn,
      index: user.index,
      loginCode: user.loginCode,
    };
  }
});

router.get("/v0/user/:id/setIndex/:index", async (ctx) => {
  const user = await getUser(ctx.params.id as string);

  if (!user) {
    ctx.response.status = NOT_FOUND_CODE;
    ctx.response.body = {
      status: ERROR,
      message: "Unknown User Snowflake",
    };
  } else {
    user.index = parseInt(ctx.params.index);
    updateUser(user);

    ctx.response.status = SUCCESS_CODE;
    ctx.response.body = {
      status: SUCCESS,
      snowflake: user.snowflake,
      votedOn: user.votedOn,
      index: user.index,
      loginCode: user.loginCode,
    };
  }
});
