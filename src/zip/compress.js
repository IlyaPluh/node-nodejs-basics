import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

function compressFile(file_path, output_path) {
  // Create a readable stream to read the file
  const file_stream = createReadStream(file_path);

  // Create a writable stream to write the compressed data
  const output_stream = createWriteStream(output_path);

  // Create a gzip transform stream
  const gzip_stream = createGzip();

  // Pipe the file stream through the gzip stream to the output stream
  file_stream.pipe(gzip_stream).pipe(output_stream);

  // Handle any errors that occur during the compression process
  file_stream.on('error', (err) => {
    console.error('Error reading file:', err);
  });

  gzip_stream.on('error', (err) => {
    console.error('Error compressing file:', err);
  });

  output_stream.on('error', (err) => {
    console.error('Error writing to output file:', err);
  });

  // Handle the finish event when the compression process is complete
  output_stream.on('finish', () => {
    console.log('File compression complete.');
  });
}

// Usage example
const file_path = 'src/zip/files/fileToCompress.txt';
const output_path = 'src/zip/files/archive.gz';
compressFile(file_path, output_path);
