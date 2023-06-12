import { Transform } from 'stream';

function createReverseTransformStream() {
  // Create a Transform Stream
  const transform_stream = new Transform({
    transform(chunk, encoding, callback) {
      // Reverse the text in the chunk
      const reversed_chunk = chunk.toString().split('').reverse().join('');
      // Push the reversed chunk to the output
      this.push(reversed_chunk);
      callback();
    }
  });

  return transform_stream;
}

function reverseText() {
  // Create a Transform Stream to reverse the text
  const reverse_transform = createReverseTransformStream();

  // Pipe the input from process.stdin to the reverse_transform, and then to process.stdout
  process.stdin.pipe(reverse_transform).pipe(process.stdout);
}

// Usage example
reverseText();
