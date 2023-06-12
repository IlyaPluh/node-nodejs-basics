import { spawn } from 'child_process';

function spawnChildProcess(args) {
  const childProcess = spawn('node', ['src/cp/files/script.js', ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  // Set up IPC communication between the master process and the child process
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  childProcess.on('error', (err) => {
    console.error('Child process error:', err);
  });
}

// Example usage
const args = process.argv.slice(2);
spawnChildProcess(args);
