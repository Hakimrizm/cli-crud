import readline from 'node:readline';

export const askQuestion = (question, outputStream = process.stdout) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: outputStream,
    });
    rl.question(question, input => {
      rl.close();
      resolve(input);
    });
  });
};