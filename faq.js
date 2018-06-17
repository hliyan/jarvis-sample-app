class FAQClient {
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

module.exports = FAQClient;