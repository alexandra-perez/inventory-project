const { nanoid } = require('nanoid');

// Show all items
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

// Create a new item
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

// Show an individual item by id 
function show(items, itemId) {
  const item = items.find((item) => item.id === itemId);
  return (
    item.name +
    ' ' +
    item.id +
    ' ' +
    item.priceInCents +
    ' ' +
    item.itemAvailability
  );
}

module.exports = { index, create, show };
