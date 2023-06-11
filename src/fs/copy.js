import { promises as fs } from 'fs';
import path from 'path';

const copyFolder = async () => {
  const sourceFolder = 'src/fs/files';
  const destinationFolder = 'src/fs/files_copy';

  try {
    // Check if the source folder exists
    await fs.access(sourceFolder);

    // Check if the destination folder already exists
    await fs.access(destinationFolder);

    // Destination folder already exists, throw an error
    throw new Error('FS operation failed. Destination folder already exists.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        // Create the destination folder
        await fs.mkdir(destinationFolder);
      } catch (error) {
        // Failed to create the destination folder
        throw new Error('FS operation failed. Unable to create the destination folder.');
      }

      try {
        // Copy the files from source to destination recursively
        await copyFilesRecursive(sourceFolder, destinationFolder);
        console.log('Folder copied successfully!');
      } catch (error) {
        // Failed to copy the files
        throw new Error('FS operation failed. Unable to copy the files.');
      }
    } else {
      // Other error occurred
      throw error;
    }
  }
};

// Recursive function to copy files from source to destination
const copyFilesRecursive = async (source, destination) => {
  const files = await fs.readdir(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    const fileStats = await fs.stat(sourcePath);
    if (fileStats.isDirectory()) {
      // Create the subdirectory in the destination
      await fs.mkdir(destinationPath);

      // Recursively copy files in the subdirectory
      await copyFilesRecursive(sourcePath, destinationPath);
    } else {
      // Copy the file
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
};

// Usage
(async () => {
  try {
    await copyFolder();
  } catch (error) {
    console.error(error.message);
  }
})();
