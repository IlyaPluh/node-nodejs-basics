import { Worker, isMainThread, workerData } from 'worker_threads';
import { cpus } from 'os';

// Function to create worker threads and distribute tasks
const createWorkerThreads = () => {
  const cpuCores = cpus().length;
  const workerPromises = [];

  // Create a worker for each CPU core
  for (let i = 0; i < cpuCores; i++) {
    const worker = new Worker('/Users/ilyaandriyanov/Documents/GitHub/node-nodejs-basics/src/wt/worker.js', {
      workerData: { n: 10 + i } // Incremental number for each worker
    });

    const workerPromise = new Promise((resolve) => {
      // Listen for messages from the worker thread
      worker.on('message', (result) => {
        resolve(result);
      });
    });

    workerPromises.push(workerPromise);
  }

  // Wait for all workers to finish and collect results
  return Promise.all(workerPromises);
};

// Main function
const main = async () => {
  if (isMainThread) {
    try {
      const results = await createWorkerThreads();
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  }
};

// Invoke the main function
main();
