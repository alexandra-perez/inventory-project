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
  return `${chalk.magenta(item.name)} ${chalk.blue(item.id)} ${chalk.green(
    item.priceInCents
  )} ${chalk.red(item.itemAvailability)}`;
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
                console.log(
                  chalk.green('\nItem successfully updated. \n'),
                  "\nRun the command 'npm run show' with the item's ID to view."
                );
                rl.close();
              }
            );
          }
        );
      });
    }
  });
}

// Delete item by ID
function destroy(items, itemId) {
  const index = items.findIndex((item) => item.id === itemId);
  if (index > -1) {
    items.splice(index, 1);
    console.log(chalk.green('Item successfully deleted.'));
    return items;
  }
  console.log(
    chalk.red('No item found. Please verify the ID provided is correct.')
  );
  return [];
}

function addToCart(items, itemId, shoppingCart) {
  const index = items.findIndex((item) => item.id === itemId);
  if (index == -1) {
    console.log(
      chalk.red('No item found. Please verify the ID provided is correct.')
    );
    return [];
  }
  shoppingCart.push(items[index]);
  const totalPrice = shoppingCart.reduce(
    (acc, curr) => acc + parseInt(curr.priceInCents),
    0
  );
  const totalItems = shoppingCart.length.toString();
  console.log(chalk.yellow.underline.bold('My Cart:'));
  console.log(
    shoppingCart
      .map((item) => {
        return item.inStock == 'true'
          ? chalk.white(`+ ${item.name} ${item.id} ${item.priceInCents}`)
          : chalk.red(`- ${item.name} ${item.id} ${item.priceInCents}`);
      })
      .join('\n')
  );
  console.log(
    `${chalk.yellow.underline.bold('Cart Total:')}\n${chalk.white.bold(
    `${totalItems} item(s)\n$${parseInt(totalPrice, 10 / 100)}`
    )}`
  );

  return shoppingCart;
}

module.exports = { index, create, show, update, destroy, addToCart };