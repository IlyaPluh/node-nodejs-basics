import { promises as fs } from 'fs';

const renameFile = async () => {
  const sourceFile = 'src/fs/files/wrongFilename.txt';
  const destinationFile = 'src/fs/files/properFilename.md';

  try {
    // Check if the source file exists
    await fs.access(sourceFile);

    // Check if the destination file already exists
    await fs.access(destinationFile);

    // Destination file already exists, throw an error
    throw new Error('FS operation failed. Destination file already exists.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        // Rename the source file to the destination file
        await fs.rename(sourceFile, destinationFile);
        console.log('File renamed successfully!');
      } catch (error) {
        // Failed to rename the file
        throw new Error('FS operation failed. Unable to rename the file.');
      }
    } else {
      // Other error occurred
      throw error;
    }
  }
};

// Usage
(async () => {
  try {
    await renameFile();
  } catch (error) {
    console.error(error.message);
  }
})();
