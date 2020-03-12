import { chalkWarning } from './chalkConfig';

export const JS_OR_CSS_REGEX = /\.js$|\.css$/;

export const consoleQuestion = (question) => {
  return new Promise((resolve) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(chalkWarning(question), (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}
