import {
  ERROR,
  INTERNAL_SERVER_ERROR_CODE,
  INVALID_REQUEST_CODE,
  NOT_FOUND_CODE,
  SUCCESS,
  SUCCESS_CODE,
} from "../../constants.ts";
import { router } from "../routes.ts";
import {
  createUser,
  getUserByLoginCode,
  updateUser,
} from "../../database/database.ts";
import { getUser } from "../../util.ts";

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

router.get("/v0/user", async (ctx) => {
  const user = await getUser(ctx.request.headers);

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

router.post("/v0/user", async (ctx) => {
  const user = await getUser(ctx.request.headers);

  if (!user) {
    ctx.response.status = NOT_FOUND_CODE;
    ctx.response.body = {
      status: ERROR,
      message: "Unknown User Snowflake",
    };
  } else {
    const body = await ctx.request.body({ type: "json" }).value;

    if (!body.index) {
      ctx.response.status = INVALID_REQUEST_CODE;
      ctx.response.body = {
        status: ERROR,
        message: "Please provide index",
      };
    }

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

router.get("/v0/user/login/:loginCode", async (ctx) => {
  const user = await getUserByLoginCode(ctx.params.loginCode as string);
  if (!user) {
    ctx.response.status = NOT_FOUND_CODE;
    ctx.response.body = {
      status: ERROR,
      message: "Unknown User Login Code",
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
