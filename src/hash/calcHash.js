import { createReadStream } from 'fs';
import { createHash } from 'crypto';

function calculateFileHash(file_path) {
  // Create a new SHA256 hash object
  const sha256_hash = createHash('sha256');

  // Create a read stream to read the file
  const file_stream = createReadStream(file_path);

  // Update the hash object with the file data
  file_stream.on('data', (chunk) => {
    sha256_hash.update(chunk);
  });

  // Calculate the hash once the file has been read completely
  file_stream.on('end', () => {
    // Get the hexadecimal representation of the hash digest
    const hash_hex = sha256_hash.digest('hex');

    // Log the hash value in the console
    console.log(`SHA256 hash for ${file_path}: ${hash_hex}`);
  });

  // Handle any errors that occur while reading the file
  file_stream.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}

// Usage example
const file_path = 'src/hash/files/fileToCalculateHashFor.txt';
calculateFileHash(file_path);