const Jarvis = require('jarvis');

const presidents = {
  
}

const jarvis = new Jarvis();

jarvis.addCommand({
  command: 'foo',
  handler: (context, data) => {
    return 'Foooo';
  }
});

const run = async () => {
  let foo = await jarvis.send('foo');
  console.log(foo);
};

run();

