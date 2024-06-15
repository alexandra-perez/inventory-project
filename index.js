const {
  readFileSync,
  writeFileSync,
  readJSONFile,
  writeJSONFile,
} = require('./src/helpers');
const { index, create, show } = require('./src/itemController');

function run() {
  const inform = console.log;
  const items = readJSONFile('./data', 'items.json');
  const action = process.argv[2];

  const item = process.argv[3];
  const priceInCents = process.argv[4];
  const itemAvailability = process.argv[5];

  let writeToFile = false;
  let updatedItems = [];

  switch (action) {
    case 'index':
      const itemsView = index(items);
      inform(`~~~My Inventory~~~\n${itemsView}`);
      break;
    case 'create':
      inform(
        "Item created!\n~~~~~~~~~~\nRun the command 'npm run index' to see the full list of items."
      );
      updatedItems = create(items, item, priceInCents, itemAvailability);
      writeToFile = true;
      break;
    case 'show':
      const itemView = show(items, item);
      inform(`**Item Details:\n------------\n${itemView}`);
      break;
  }
  if (writeToFile) {
    writeJSONFile('./data', 'items.json', updatedItems);
  }
}

run();
