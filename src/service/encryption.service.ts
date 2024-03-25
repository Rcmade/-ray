// Import the crypto module for encryption and decryption functionalities
import crypto from "crypto";

/**
 * Check if the SECRET_KEY environment variable is set and convert it from a hex string to a Buffer.
 * If not set, use a default 32-byte hex string.
 * Ensure the secret key is exactly 32 bytes long (256 bits) to match the AES-256 encryption standard.
 */
const secretKeyHex =
  process.env.SECRET_KEY ||
  "7ce2b36d89434b8f966469f0a9b33460ef8acfb65d5366085beec101cd72947b"; // Default secret key in hex format
const secretKey = Buffer.from(secretKeyHex, "hex"); // Convert hex string to Buffer

// Verify the length of the secret key to ensure it is 32 bytes (256 bits)
if (secretKey.length !== 32) {
  console.error("Secret key must be 32 bytes long.");
  process.exit(1); // Exit if the secret key is not the correct length
}

/**
 * A class providing static methods to encrypt and decrypt strings using AES-256-CTR.
 */
class EncryptionService {
  /**
   * Encrypts a text string.
   * @param {string} text The text to be encrypted.
   * @returns {string} The encrypted text, including the IV, as a hex string.
   */
  static encrypt(text: string): string {
    const iv = crypto.randomBytes(16); // Generate a 16-byte initialization vector (IV) for AES
    const cipher = crypto.createCipheriv("aes-256-ctr", secretKey, iv); // Create a cipher instance
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]); // Encrypt the text and finalize the encryption
    return iv.toString("hex") + ":" + encrypted.toString("hex"); // Return IV and encrypted text as a hex string, separated by a colon
  }

  /**
   * Decrypts an encrypted string.
   * @param {string} data The encrypted data, including the IV, as a hex string.
   * @returns {string} The decrypted text.
   */
  static decrypt(data: string): string {
    const parts = data.split(":"); // Split the encrypted data into IV and encrypted content
    if (parts.length !== 2) {
      throw new Error("The encrypted data is not in the correct format."); // Validate format
    }
    const iv = Buffer.from(parts[0], "hex"); // Extract and convert IV from hex to Buffer
    const encryptedContent = Buffer.from(parts[1], "hex"); // Extract and convert encrypted content from hex to Buffer

    const decipher = crypto.createDecipheriv("aes-256-ctr", secretKey, iv); // Create a decipher instance
    const decrypted = Buffer.concat([
      decipher.update(encryptedContent), // Decrypt the encrypted content
      decipher.final(), // Finalize the decryption
    ]);
    return decrypted.toString(); // Convert decrypted Buffer back to a string
  }
}

// // Example usage of the EncryptionService class
// const encryptedString = EncryptionService.encrypt("Sensitive data"); // Encrypt a string
// console.log("Encrypted String:", encryptedString); // Log the encrypted string

// const decryptedData = EncryptionService.decrypt(encryptedString); // Decrypt the previously encrypted string
// console.log("Decrypted Data:", decryptedData); // Log the decrypted data

export default EncryptionService;
