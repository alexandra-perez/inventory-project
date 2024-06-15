const { nanoid } = require('nanoid');

function create(items, itemName) {
    const item = {
        name: itemName,
        id: nanoid(12)
        // priceInCents: itemPriceInCents,
        // inStock: itemAvailability
    };

    items.push(item);

    return items;
}

module.exports = { create };