import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';

function decompressFile(archive_path, output_path) {
  // Create a readable stream to read the compressed archive
  const archive_stream = createReadStream(archive_path);

  // Create a writable stream to write the decompressed data
  const output_stream = createWriteStream(output_path);

  // Create a gzip transform stream for decompression
  const gunzip_stream = createGunzip();

  // Pipe the archive stream through the gunzip stream to the output stream
  archive_stream.pipe(gunzip_stream).pipe(output_stream);

  // Handle any errors that occur during the decompression process
  archive_stream.on('error', (err) => {
    console.error('Error reading archive:', err);
  });

  gunzip_stream.on('error', (err) => {
    console.error('Error decompressing archive:', err);
  });

  output_stream.on('error', (err) => {
    console.error('Error writing to output file:', err);
  });

  // Handle the finish event when the decompression process is complete
  output_stream.on('finish', () => {
    console.log('File decompression complete.');
  });
}

// Usage example
const archive_path = 'src/zip/files/archive.gz';
const output_path = 'src/zip/files/fileToCompress.txt';
decompressFile(archive_path, output_path);
