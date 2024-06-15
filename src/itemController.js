const { nanoid } = require('nanoid');
const readline = require('node:readline');
const { writeJSONFile } = require('./helpers');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function update(items) {
  return rl.question('Enter item ID to update', (itemId) => {
    rl.question('Enter new name: ', (newName) => {
      rl.question('Enter new price in cents: ', (newPriceInCents) => {
        rl.question('Is it in stock? (true/false); ', (newAvailability) => {
          const itemIndex = items.findIndex((item) => item.id === itemId);
          if (itemIndex === -1) {
            console.log('Item not found.');
          } else {
            items[itemIndex].name = newName;
            items[itemIndex].priceInCents = newPriceInCents;
            items[itemIndex].inStock = newAvailability.toLowerCase().trim();
          }
          writeJSONFile('./data', 'items.json', items);
          console.log('Item successfully updated. ');

          rl.close();
        });
      });
    });
  });
}

module.exports = { index, create, show, update };