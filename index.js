const Jarvis = require('jarvis');

class Presidents {
  constructor() {
    this.data = [
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
    ];
  }

  getPresident(country) {
    let president = null;
    this.data.forEach((item) => {
      if (item.country.match(new RegExp(country, 'i')))
        president = item.president;
    });
    return president;
  }
}

const jarvis = new Jarvis();
const presidents = new Presidents();

jarvis.addCommand({
  command: 'who is the president of',
  handler: (context, data) => {
    const words = data.match(/\b(\w+)\b/g);
    const country = words[5];
    const president = presidents.getPresident(country);
    return president 
      ? `the president of ${country} is ${president}`
      : `i don't know who the president of ${country} is`;
  }
});

const run = async () => {
  let foo = await jarvis.send('who is the president of china?');
  console.log(foo);
};

run();

