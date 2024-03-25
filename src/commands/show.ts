import EncryptionService from "../service/encryption.service";
import StorageService from "../service/storage.service";

/**
 * Displays the decrypted value of a specified token. It retrieves the encrypted token
 * value from storage, decrypts it, and prints the decrypted value to the console. If the
 * specified token is not found in storage, a message indicating that the token was not
 * found is displayed. Any errors encountered during the decryption or retrieval process
 * are caught and logged.
 *
 * @param {string} tokenName The name of the token whose value is to be displayed. This
 * name is used to look up the token in the storage.
 */
export async function showTokenValue(tokenName: string) {
  try {
    let data = StorageService.readStorage();
    if (data && data[tokenName]) {
      const decryptedValue = EncryptionService.decrypt(data[tokenName]);
      console.log(`${tokenName}: ${decryptedValue}`);
    } else {
      console.log(`Token '${tokenName}' not found.`);
    }
  } catch (error) {
    console.error("An error occurred while retrieving the token:", error);
  }
}
