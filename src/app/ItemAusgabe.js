class ItemAusgabe {}
ItemAusgabe.schema = {
    name: 'ItemAusgabe',
    properties: {
        amount: 'float',
        category: 'string',
        date: 'date',
        year: 'int',
        month: 'int',
        day: 'int',
        note: 'string',
  }
};

module.exports = ItemAusgabe;
