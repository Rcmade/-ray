import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as readline from "readline";

 const setupAutocomplete = () => {
  // Define the path to the user's shell profiles
  const shellProfiles: string[] = [".bashrc", ".bash_profile", ".zshrc"];

  const autocompleteScriptPath: string = path.join(
    __dirname,
    "autocomplete",
    "ray-autocomplete.bash"
  );
  const sourceString = `\n[ -f ${autocompleteScriptPath} ] && . ${autocompleteScriptPath}\n`;

  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask user for consent before proceeding
  rl.question(
    "This setup will add autocompletion support to your shell profile. Continue? [Y/n] ",
    (answer: string) => {
      const consent: string = answer.toLowerCase() || "y";
      if (consent === "y") {
        shellProfiles.forEach((profileName: string) => {
          const profilePath: string = path.join(os.homedir(), profileName);

          // Skip if profile file doesn't exist
          if (!fs.existsSync(profilePath)) return;

          try {
            const content: string = fs.readFileSync(profilePath, "utf8");

            // Check if the script is already sourced in the profile
            if (content.includes(sourceString.trim())) {
              console.log(
                `${profileName} already sources the autocompletion script.`
              );
            } else {
              // Append source string to the profile
              fs.appendFileSync(profilePath, sourceString);
              console.log(`Autocompletion setup completed in ${profileName}.`);
            }
          } catch (err) {
            console.error(`Error updating ${profileName}:`, err);
          }
        });

        console.log(
          "Please restart your terminal or source your profile file(s) to enable autocompletion."
        );
      } else {
        console.log("Setup cancelled by user.");
      }

      rl.close();
    }
  );
};

export default setupAutocomplete;