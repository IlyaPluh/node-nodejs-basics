import { promises as fs } from 'fs';
import path from 'path';

const printFilenames = async () => {
  const folderPath = 'src/fs/files';

  try {
    // Check if the files folder exists
    await fs.access(folderPath);

    // Read the files in the folder
    const files = await fs.readdir(folderPath);

    // Print the filenames
    files.forEach(file => {
      console.log(file);
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Files folder doesn't exist, throw an error
      throw new Error('FS operation failed. The files folder does not exist.');
    } else {
      // Other error occurred
      throw error;
    }
  }
};

// Usage
(async () => {
  try {
    await printFilenames();
  } catch (error) {
    console.error(error.message);
  }
})();
