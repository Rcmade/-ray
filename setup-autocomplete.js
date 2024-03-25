const fs = require("fs");
const os = require("os");
const path = require("path");

const bashrcPath = path.join(os.homedir(), ".bashrc");
const autocompleteScriptPath = path.join(
  __dirname,
  "autocomplete",
  "ray-autocomplete.bash"
);
const sourceString = `\n[ -f ${autocompleteScriptPath} ] && . ${autocompleteScriptPath}\n`;

// Append source string to .bashrc, if not already present
fs.readFile(bashrcPath, "utf8", (err, data) => {
  console.log({ autocompleteScriptPath });
  if (err) {
    console.error("Error reading .bashrc:", err);
    return;
  }
  if (data.includes(autocompleteScriptPath)) {
    console.log("Autocomplete script already sourced in .bashrc");
  } else {
    fs.appendFile(bashrcPath, sourceString, (err) => {
      if (err) {
        console.error("Error appending to .bashrc:", err);
      } else {
        console.log("Autocomplete setup completed.");
      }
    });
  }
});
