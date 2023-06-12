import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// Function to send the result back to the main thread
const sendResult = (status, data) => {
  parentPort.postMessage({ status, data });
};

// Handle the data received from the main thread
const { n } = workerData;
try {
  const result = nthFibonacci(n);
  sendResult('resolved', result);
} catch (error) {
  sendResult('error', null);
}
