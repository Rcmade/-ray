import EncryptionService from "../service/encryption.service";
import StorageService from "../service/storage.service";

export async function showSnippet(name: string) {
  try {
    let data = StorageService.readStorage();
    if (data && data[name]) {
      const decryptedValue = EncryptionService.decrypt(data[name]);
      console.log(decryptedValue);
    } else {
      console.log(`Name '${name}' not found.`);
    }
  } catch (error) {
    console.error("An error occurred while retrieving the token:", error);
  }
}
