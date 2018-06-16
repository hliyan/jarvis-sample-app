const Jarvis = require('jarvis');
const vorpal = require('vorpal')();

class FaqApp {
  constructor() {
    this.data = {
      presidents: [
        {
          country: 'USA',
          president: 'Barack Obama'
        },
        {
          country: 'Russia',
          president: 'Vladamir Putin'
        },
        {
          country: 'China',
          president: 'Xi Jing Ping'
        }
      ]
    };
  }

  getPresident(country) {
    let president = null;
    this.data.presidents.forEach((item) => {
      if (item.country.match(new RegExp(country, 'i')))
        president = item.president;
    });
    return president;
  }
}

const faqShell = new Jarvis();
const faqShell = new FaqApp();

faqShell.addCommand({
  command: 'who is the president of',
  handler: (context, args) => {
    const words = args.match(/\b(\w+)\b/g);
    const country = words[5];
    const president = faqShell.getPresident(country);
    return president 
      ? `the president of ${country} is ${president}`
      : `i don't know who the president of ${country} is`;
  }
});

vorpal
  .mode('faq')
  .delimiter('faq>')
  .action(async function(args, callback) {
    let answer = await faqShell.send(args);
    vorpal.log(answer ? answer : 'I do not understand');
    callback();
  });

vorpal
  .delimiter('jarvis>')
  .show();

  