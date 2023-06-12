import { createReadStream } from 'fs';

function readFileContent(file_path) {
  // Create a read stream to read the file
  const file_stream = createReadStream(file_path, 'utf8');

  // Handle data events to read the content
  file_stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  // Handle end event when the file has been read completely
  file_stream.on('end', () => {
    process.stdout.write('\n');
  });

  // Handle any errors that occur while reading the file
  file_stream.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}

// Usage example
const file_path = 'src/streams/files/fileToRead.txt';
readFileContent(file_path);
