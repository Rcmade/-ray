import { program } from "commander";
import addToken from "../commands/add";
import listTokens from "../commands/list";
import removeToken from "../commands/remove";
const cli = {
  add: {
    help: "add <tokenName> <tokenValue>",
    description: "Add a new token",
    action: addToken,
  },
  list: {
    help: "list",
    description: "List all tokens",
  action: listTokens,
  },
  remove: {
    help: "remove <tokenName>",
    description: "Remove a token",
    action: removeToken,
  },
};

export async function getCLI() {
  const module = await import("../cli");
  return module.default;
}

export default cli;
