import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_PORT: env.get("MAILER_PORT").required().asPortNumber(),
  PROD: env.get("PROD").required().asBool(),
};
