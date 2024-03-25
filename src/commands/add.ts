import fs from "fs";
import readline from "readline";
import path from "path";
import EncryptionService from "../service/encryption.service";
import { getCLI } from "../cli";
import StorageService from "../service/storage.service";
import InputService from "../service/input.service";

const storagePath = path.join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".rayconfig.json"
);

/**
 * Adds or updates a token in the storage. If the token name already exists,
 * the user is prompted to decide whether to override the existing token. The
 * token value is encrypted before being saved. Reserved command names are not
 * allowed for token names.
 *
 * @param {string} name The name of the token to add or update. This name cannot
 * be one of the reserved command names.
 * @param {string} value The value of the token to be encrypted and stored.
 * @returns {Promise<void>} A promise that resolves when the addition or update
 * process is complete. This function does not explicitly return a value, but
 * operations are asynchronous due to file reading and potential user input.
 *
 * @example
 * // Add a new token or update an existing one
 * addToken('api_key', '12345').then(() => {
 *   console.log('Token operation complete.');
 * });
 */
const addToken = async (name: string, value: string) => {
  // Retrieve reserved commands to prevent using them as token names.
  const cli = await getCLI();
  const reservedCommands = Object.keys(cli || {});
  if (reservedCommands.includes(name)) {
    console.log(`This "${name}" is reserved. Please choose a different name.`);
    return;
  }

  try {
    let data = StorageService.readStorage();

    if (data[name]) {
      const decryptedValue = EncryptionService.decrypt(data[name]);

      const answer = await InputService.askQuestion(
        `The ${name} already exists with value ${decryptedValue}. Do you want to override it? (yes/no):-`
      );

      if (answer) {
        data[name] = EncryptionService.encrypt(value);
        StorageService.writeStorage(data);
        console.log(`Token ${name} updated successfully.`);
      } else {
        console.log(`Token ${name} not updated.`);
      }
    } else {
      data[name] = EncryptionService.encrypt(value);
      StorageService.writeStorage(data);
      console.log(`Token ${name} added successfully.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
export default addToken;
