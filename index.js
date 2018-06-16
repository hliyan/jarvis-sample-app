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
        },
        {
          country: 'Sri Lanka',
          president: 'Maithreepala Sirisena'
        }
      ]
    };
  }

  getPresident(country) {
    let president = null;
    this.data.presidents.forEach((item) => {
      if (item.country.match(new RegExp(`^${country}$`, 'i')))
        president = item.president;
    });
    return president;
  }
}

const faqShell = new Jarvis();
const faqApp = new FaqApp();

faqShell.addCommand({
  command: 'who is the president of <country>',
  handler: ({variables}) => {
    const {country} = variables;
    const president = faqApp.getPresident(country);
    return president 
      ? `the president of ${country} is ${president}`
      : `i don't know who the president of ${country} is`;
  }
});

vorpal
  .mode('faq')
  .description('Enter FAQ mode')
  .delimiter('faq>')
  .action(async function(args, callback) {
    let answer = await faqShell.send(args);
    vorpal.log(answer ? answer : 'I do not understand');
    callback();
  });

vorpal
  .delimiter('jarvis>')
  .show();
vorpal.exec('faq');

  