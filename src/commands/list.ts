// Inside src/commands/list.ts

import StorageService from "../service/storage.service";

/**
 * Lists all the token names currently stored. It retrieves the token names
 * from the storage, checks if there are any tokens available, and prints
 * each token name to the console. If no tokens are found, it notifies the user.
 * Any errors encountered during the process are caught and logged, indicating
 * an issue with accessing or reading the storage.
 */
const listTokens = () => {
  try {
    // Retrieve the entire data object from storage.
    let data = StorageService.readStorage();

    // Extract and list the names of all stored tokens.
    const tokenNames = Object.keys(data);

    if (tokenNames.length === 0) {
      // Inform the user if no tokens are currently stored.
      console.log("No tokens found.");
      return;
    }

    // Display the names of all tokens if available.
    console.log("Available tokens:");
    tokenNames.forEach((name) => {
      console.log(`- ${name}`);
    });
  } catch (error) {
    // Log any errors encountered during the listing process.
    console.error("An error occurred while listing tokens:", error);
  }
};

export default listTokens;
