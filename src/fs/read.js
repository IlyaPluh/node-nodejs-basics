import { promises as fs } from 'fs';

const readFileContent = async () => {
  const fileToRead = 'src/fs/files/fileToRead.txt';

  try {
    // Check if the file to read exists
    await fs.access(fileToRead);

    // Read the file content
    const content = await fs.readFile(fileToRead, 'utf-8');

    // Print the content to the console
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, throw an error
      throw new Error('FS operation failed. The file does not exist.');
    } else {
      // Other error occurred
      throw error;
    }
  }
};

// Usage
(async () => {
  try {
    await readFileContent();
  } catch (error) {
    console.error(error.message);
  }
})();
