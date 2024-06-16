const { nanoid } = require('nanoid');
const readline = require('node:readline');
const { writeJSONFile } = require('./helpers');
const chalk = require('chalk');
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

// Show an individual item by ID
function show(items, itemId) {
  const item = items.find((item) => item.id === itemId);
  return `${chalk.pink(item.name)} ${chalk.blue(item.id)} ${chalk.green(item.priceInCents)} ${chalk.red(item.itemAvailability)}`;
}

// Update item by ID
function update(items) {
  rl.question(`${chalk.green('Enter item ID to update: ')}`, (itemId) => {
    const itemIndex = items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      console.log(chalk.red('Item not found.'));
    } else {
      rl.question(`${chalk.green('Enter new name: ')}`, (newName) => {
        rl.question(
          `${chalk.green('Enter new price in cents: ')}`,
          (newPriceInCents) => {
            rl.question(
              `${chalk.green('Is it in stock? (true/false): ')}`,
              (newAvailability) => {
                items[itemIndex].name = newName;
                items[itemIndex].priceInCents = newPriceInCents;
                items[itemIndex].itemAvailability = newAvailability
                  .toLowerCase()
                  .trim();
                writeJSONFile('./data', 'items.json', items);
                console.log(chalk.green('Item successfully updated.'));
                rl.close();
              }
            );
          }
        );
      });
    }
  });
}

module.exports = { index, create, show, update };
