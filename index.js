const { readJSONFile, writeJSONFile } = require('./src/helpers');
const { index, create } = require('./src/itemController');

function run() {
  const inform = console.log;
  const items = readJSONFile('./data', 'items.json');
  const action = process.argv[2];
  const item = process.argv[3];
  let writeToFile = false;
  let updatedItems = [];

  switch (action) {
    case 'index':
      inform(action);
      break;
    case 'create':
      inform(action);
      break;
  }
}
