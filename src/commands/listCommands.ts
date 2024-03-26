import { getCLI } from "../cli";

export async function listCommands() {
  const commandList = (await getCLI()) || {};
  const commandNames = Object.keys(commandList).join(" ");
  console.log(commandNames);
}

