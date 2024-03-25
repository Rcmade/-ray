// ./service/storage.service.ts

import fs from "fs";
import path from "path";

const storagePath = path.join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".rayconfig.json"
);

class StorageService {
  /**
   * Reads and returns the content of the storage file.
   * @returns {Record<string, any>} Parsed content of the storage file.
   */
  static readStorage(): Record<string, any> {
    if (fs.existsSync(storagePath)) {
      const rawData = fs.readFileSync(storagePath, "utf-8");
      return JSON.parse(rawData);
    }
    return {};
  }

  /**
   * Writes the provided data to the storage file.
   * @param {Record<string, any>} data Data to be written to the file.
   */
  static writeStorage(data: Record<string, any>): void {
    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
  }
}

export default StorageService;
