const Jarvis = require('jarvis');
const vorpal = require('vorpal')();
const FAQClient = require('./faq');

const app = new Jarvis();
const client = new FAQClient();

app.addCommand({
  command: 'getCountryPresident <country>',
  aliases: [
    'who is the president of <country>',
    'president of <country>', 
    '<country> president'
  ],
  handler: async ({args: {country}}) => {
    const president = await client.getPresident(country);
    return president 
      ? `the president of ${country} is ${president}`
      : `i don't know ${country}`;
  }
});

vorpal
  .mode('faq')
  .description('Enter FAQ mode')
  .delimiter('faq>')
  .action(async function(args, callback) {
    let answer = await app.send(args);
    vorpal.log(answer ? answer : 'I do not understand');
    callback();
  });

vorpal
  .delimiter('jarvis>')
  .show();
vorpal.exec('faq');

  