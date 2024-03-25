// Assuming StorageService is similar to InputService in structure and purpose
import StorageService from "../service/storage.service";
import InputService from "../service/input.service";

const removeToken = async (tokenName: string) => {
  const data = StorageService.readStorage();

  if (data[tokenName]) {
    const answer = await InputService.askQuestion(
      `Are you sure you want to remove the token '${tokenName}'? [y/N] `
    );
    if (answer) {
      delete data[tokenName];
      StorageService.writeStorage(data);
      console.log(`Token '${tokenName}' has been removed.`);
    } else {
      console.log("Removal cancelled.");
    }
  } else {
    console.log(`Token '${tokenName}' not found.`);
  }
};

export default removeToken;
