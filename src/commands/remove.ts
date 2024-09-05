// Assuming StorageService is similar to InputService in structure and purpose
import StorageService from "../service/storage.service";
import InputService from "../service/input.service";
import { logError, logSuccess, logWarning } from "../loggers";

const remove = async (name: string) => {
  const data = StorageService.readStorage();

  if (data[name]) {
    const answer = await InputService.askQuestion(
      `Are you sure you want to remove the token '${name}'? [y/N] `
    );
    if (answer) {
      delete data[name];
      StorageService.writeStorage(data);
      logSuccess(`Name: '${name}' has been removed.`);
    } else {
      logWarning("Removal cancelled.");
    }
  } else {
    logError(`Name '${name}' not found.`);
  }
};

export default remove;
