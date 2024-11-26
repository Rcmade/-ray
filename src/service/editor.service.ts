import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

/**
 * Service to handle editing tasks using the system's default editor.
 */
class EditorService {
  /**
   * Opens the system's default text editor for multiline input and returns the content.
   * If no content is provided or an error occurs, it returns `null`.
   * The input is written to a temporary file, edited by the user in the editor,
   * and then read back and returned as a string.
   *
   * @returns {string | null} The content provided by the user in the editor or `null` if an error occurs.
   *
   * @example
   * const userInput = EditorService.openEditorForMultilineInput();
   * console.log(userInput); // Logs the content written by the user in the editor
   */
  public static openEditorForMultilineInput(): string | null {
    const tempFilePath = path.join(os.tmpdir(), "snippet_input.txt");
    fs.writeFileSync(tempFilePath, "");
    const editor = process.env.EDITOR || "nano";

    try {
      execSync(`${editor} ${tempFilePath}`, { stdio: "inherit" });
      return fs.readFileSync(tempFilePath, "utf-8").trim();
    } catch (error: any) {
      console.error("Error opening editor:", error.message);
      return null;
    } finally {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    }
  }
}

export default EditorService;
