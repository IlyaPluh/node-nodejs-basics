const fs = require('fs').promises;

const deleteFile = async () => {
  const fileToRemove = 'src/fs/files/fileToRemove.txt';

  try {
    // Check if the file to remove exists
    await fs.access(fileToRemove);

    // File exists, delete it
    await fs.unlink(fileToRemove);
    console.log('File deleted successfully!');
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
    await deleteFile();
  } catch (error) {
    console.error(error.message);
  }
})();
