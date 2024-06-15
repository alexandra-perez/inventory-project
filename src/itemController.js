const { nanoid } = require('nanoid');

function create(items, itemName, itemPriceInCents, itemAvailability) {
    const item = {
        name: itemName,
        id: nanoid(12),
        itemPriceInCents: itemPriceInCents,
        inStock: itemAvailability
    };

    items.push(item);

    return items;
}

module.exports = { create };