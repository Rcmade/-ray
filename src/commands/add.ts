import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import EncryptionService from "../service/encryption.service";
import StorageService from "../service/storage.service";
import InputService from "../service/input.service";
import { AddFunArgs } from "../types";
import EditorService from "../service/editor.service";

const storagePath = path.join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".rayconfig.json"
);

const add = async ({ name, value, isCommand }: AddFunArgs) => {
  const cli = await import("../cli").then((module) => module.default);
  const reservedCommands = Object.keys(cli || {});
  console.log(isCommand);
  if (reservedCommands.includes(name)) {
    console.log(
      `The name "${name}" is reserved. Please choose a different name.`
    );
    return;
  }

  if (!value && isCommand) {
    console.log("Opening editor for multiline input...");
    const val = EditorService.openEditorForMultilineInput();
    if (!val) {
      console.log("No content provided. Operation aborted.");
      return;
    }
    value = val;
    if (!value) {
      console.log("No content provided. Operation aborted.");
      return;
    }
  }

  // If neither value nor command is provided, show an error and explain how to use the command
  if (!value && !isCommand) {
    console.log(
      `Error: You must provide either a value or the --command flag.`
    );
    console.log(`Usage: ray add <name> <value>`);
    return;
  }

  try {
    let data = StorageService.readStorage();
    if (data[name]) {
      const decryptedValue = EncryptionService.decrypt(data[name]);
      const answer = await InputService.askQuestion(
        `The ${name} already exists with value ${decryptedValue.substring(
          0,
          50
        )}..., Do you want to override it? (yes/no):- `
      );
      if (answer) {
        data[name] = EncryptionService.encrypt(value);
        StorageService.writeStorage(data);
        console.log(`Name: ${name} updated successfully.`);
      } else {
        console.log(`Name: ${name} was not updated.`);
      }
    } else {
      data[name] = EncryptionService.encrypt(value);
      StorageService.writeStorage(data);
      console.log(`Snippet ${name} added successfully.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default add;
