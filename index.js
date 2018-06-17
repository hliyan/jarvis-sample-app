const FAQClient = require('./faq');   // business logic from here
const Jarvis = require('jarvis');     // wrapped by jarvis 
const readline = require('readline'); // and connected to a command line

const app = new Jarvis();
const client = new FAQClient();

// register the command
app.addCommand({
  command: 'getCountryPresident <country>',
  aliases: [
    'who is the president of <country>',
    '<country> president'
  ],
  handler: async ({args: {country}}) => {
    const president = await client.getPresident(country);
    return president ? `the president of ${country} is ${president}`
      : `i don't know ${country}`;
  }
});

// start the CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'jarvis> '
});

rl.prompt();

// feed CLI input to the app, and app output back to CLI
rl.on('line', async (line) => {
  const res = await app.send(line.trim());
  console.log(res ? `  ${res}` : '  I don\'t understand');
  rl.prompt();
});

// TODO: error handling and other best practices