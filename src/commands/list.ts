// Inside src/commands/list.ts

import { logInfo } from "../loggers";
import StorageService from "../service/storage.service";

const list = () => {
  try {
    // Retrieve the entire data object from storage.
    let data = StorageService.readStorage();

    // Extract and list the names of all stored tokens.
    const tokenNames = Object.keys(data);
    // Display the names of all tokens if available.
    tokenNames.forEach((name) => {
      logInfo(`- ${name}`);
    });
  } catch (error) {
    // Log any errors encountered during the listing process.
    console.error("An error occurred while listing tokens:", error);
  }
};

export default list;
