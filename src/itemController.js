const { nanoid } = require('nanoid');

function index(items) {
  return items
    .map(
      (item) =>
        item.name +
        ' ' +
        item.id +
        ' ' +
        item.priceInCents +
        ' ' +
        item.itemAvailability
    )
    .join('\n');
}

function create(items, itemName, priceInCents, itemAvailability) {
  const item = {
    name: itemName,
    id: nanoid(12),
    priceInCents: priceInCents,
    inStock: itemAvailability,
  };

  items.push(item);

  return items;
}

module.exports = { index, create };
