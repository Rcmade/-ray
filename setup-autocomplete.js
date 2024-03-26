const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

// Define the path to the user's shell profiles
const shellProfiles = [".bashrc", ".bash_profile", ".zshrc"];

const autocompleteScriptPath = path.join(
  __dirname,
  "autocomplete",
  "ray-autocomplete.bash"
);
const sourceString = `\n[ -f ${autocompleteScriptPath} ] && . ${autocompleteScriptPath}\n`;






// const fs = require("fs");
// const os = require("os");
// const path = require("path");

// // Adjust the filename according to your actual script's location and name
// const autocompleteScriptPath = path.join(
//   __dirname,
//   "autocomplete",
//   "ray-autocomplete.bash"
// );

// Assuming Bash as the default shell
const profileFilePath = path.join(os.homedir(), ".bashrc");

function appendAutocompleteSourceCommand() {
        shellProfiles.forEach((profileName) => {
          const profilePath = path.join(os.homedir(), profileName);

          // Skip if profile file doesn't exist
          if (!fs.existsSync(profilePath)) return;

          try {
            const content = fs.readFileSync(profilePath, "utf8");

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
}

appendAutocompleteSourceCommand();
