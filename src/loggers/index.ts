import chalk from "chalk";

export const logSuccess = (message: any) => {
  console.log(chalk.green(message));
};

export const logError = (message: any) => {
  console.log(chalk.red(message));
};

export const logWarning = (message: any) => {
  console.log(chalk.yellow(message));
};

export const logInfo = (message: any) => {
  console.log(chalk.white(message));
};
