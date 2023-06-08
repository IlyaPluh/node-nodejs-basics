import { promises as fs } from 'fs';

const create = async () => {
  const folderPath = 'src/fs/files/';
  const filePath = folderPath + 'fresh.txt';

  try {
    // Check if the file already exists
    await fs.access(filePath);

    // File already exists, throw an error
    throw new Error('FS operation failed. The file already exists.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, create it with the content
      await fs.writeFile(filePath, 'I am fresh and young');
      console.log('Fresh file created successfully!');
    } else {
      // Other error occurred
      throw error;
    }
  }
};

// Usage
(async () => {
  try {
    await create();
  } catch (error) {
    console.error(error.message);
  }
})();
