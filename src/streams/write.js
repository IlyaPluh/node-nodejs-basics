import { createWriteStream } from 'fs';

function writeDataToFile(file_path) {
  // Create a writable stream to write data to the file
  const file_stream = createWriteStream(file_path);

  // Pipe the data from process.stdin to the file_stream
  process.stdin.pipe(file_stream);

  // Handle any errors that occur during the writing process
  file_stream.on('error', (err) => {
    console.error('Error writing to file:', err);
  });

  // Handle the finish event when all data has been written to the file
  file_stream.on('finish', () => {
    console.log('Data has been written to the file.');
  });
}

// Usage example
const file_path = 'src/streams/files/fileToWrite.txt';
writeDataToFile(file_path);
