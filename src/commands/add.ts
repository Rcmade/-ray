import path from "path";
import EncryptionService from "@/service/encryption.service";
import { getCLI } from "@/cli";
import StorageService from "@/service/storage.service";
import InputService from "@/service/input.service";
import { logSuccess, logWarning } from "@/loggers";
import { AddFunArgs } from "@/types";

const storagePath = path.join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".rayconfig.json"
);

const add = async ({ name, value, isCommand }: AddFunArgs) => {
  // Retrieve reserved commands to prevent using them as token names.
  const cli = await getCLI();
  const reservedCommands = Object.keys(cli || {});
  if (reservedCommands.includes(name)) {
    logWarning(
      `The name "${name}" is reserved. Please choose a different name.`
    );
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
        logSuccess(`Name: ${name} updated successfully.`);
      } else {
        logWarning(`Name: ${name} was not updated.`);
      }
    } else {
      data[name] = EncryptionService.encrypt(value);
      StorageService.writeStorage(data);
      logSuccess(`Snippet ${name} added successfully.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
export default add;
