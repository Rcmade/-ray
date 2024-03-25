import readline from "readline";

class InputService {
  /**
   * Asks a yes/no question and returns true for "yes" or "y" responses,
   * and false for anything else.
   *
   * @param {string} question The question to prompt to the user.
   * @returns {Promise<boolean>} Promise resolving to true if the user
   * answers "yes" or "y", false otherwise.
   */
  static askQuestion(question: string): Promise<boolean> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(question, (answer) => {
        rl.close();
        // Check if the answer is 'yes' or 'y' (case insensitive), resolve true if so
        const affirmativeResponses = ["yes", "y"];
        resolve(affirmativeResponses.includes(answer.trim().toLowerCase()));
      });
    });
  }
}

export default InputService;
