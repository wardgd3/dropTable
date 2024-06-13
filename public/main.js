import { dropTable } from './dropsObject.js';

export function getRandomDrop(table) {
    const drops = {};
    for (const item in table) {
        const rarity = table[item].rarity;
        const dropChance = Math.random() * rarity;
        if (dropChance < 1) {
            drops[item] = table[item];
        }
    }
    return drops;
}

export function getPlayerDrop(dropTable) {
    const playerDrops = {};

    const uniqueDrops = getRandomDrop(dropTable.uniqueDropTable);
    Object.assign(playerDrops, uniqueDrops);

    const otherDrops = getRandomDrop(dropTable.other);
    Object.assign(playerDrops, otherDrops);

    const rareDrops = getRandomDrop(dropTable.rareDropTable);
    Object.assign(playerDrops, rareDrops);

    for (const item in dropTable.always) {
        playerDrops[item] = dropTable.always[item];
    }

    return playerDrops;
}

export function createDropTable(data) {
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.overflowX = 'auto';
    container.style.whiteSpace = 'nowrap';
    container.style.marginTop = '20px';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontSize = '18px';
    table.style.textAlign = 'left';

    container.appendChild(table);

    const headerRow = table.insertRow();

    // Create headers
    const headers = ['Item', 'Quantity', 'Rarity', 'Price'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ddd';
        th.style.padding = '12px';
        th.style.backgroundColor = '#f2f2f2';
        th.style.textAlign = 'left';
        headerRow.appendChild(th);
    });

    let totalEarnings = 0;

    // Create rows
    for (const [key, value] of Object.entries(data)) {
        const row = table.insertRow();

        // Determine the text color based on item type
        let textColor = 'black';
        if (dropTable.uniqueDropTable.hasOwnProperty(key)) {
            textColor = 'purple';
        } else if (dropTable.rareDropTable.hasOwnProperty(key)) {
            textColor = 'green';
        }

        const itemCell = row.insertCell();
        itemCell.textContent = key;
        itemCell.style.color = textColor;
        itemCell.style.border = '1px solid #ddd';
        itemCell.style.padding = '8px';
        itemCell.style.textAlign = 'left';

        const quantityCell = row.insertCell();
        quantityCell.textContent = value.quantity;
        quantityCell.style.color = textColor;
        quantityCell.style.border = '1px solid #ddd';
        quantityCell.style.padding = '8px';
        quantityCell.style.textAlign = 'left';

        const rarityCell = row.insertCell();
        rarityCell.textContent = value.rarity !== undefined ? value.rarity : 'N/A';
        rarityCell.style.color = textColor;
        rarityCell.style.border = '1px solid #ddd';
        rarityCell.style.padding = '8px';
        rarityCell.style.textAlign = 'left';

        const priceCell = row.insertCell();
        priceCell.textContent = value.price;
        priceCell.style.color = textColor;
        priceCell.style.border = '1px solid #ddd';
        priceCell.style.padding = '8px';
        priceCell.style.textAlign = 'left';

        totalEarnings += value.price * value.quantity;
    }

    document.getElementById('loot-tracker').appendChild(container);
    return { table, totalEarnings };
}

export function createSummaryTable(totalEarnings, averageEarnings, grandTotal, killCount, uniqueItemsCount) {
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.overflowX = 'auto';
    container.style.whiteSpace = 'nowrap';
    container.style.marginTop = '20px';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontSize = '18px';
    table.style.textAlign = 'left';

    container.appendChild(table);

    const headerRow = table.insertRow();
    const headers = ['Total Earnings', 'Average per Kill', 'Grand Total', 'Total Kills', 'Unique Items'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ddd';
        th.style.padding = '12px';
        th.style.backgroundColor = '#f2f2f2';
        th.style.textAlign = 'left';
        headerRow.appendChild(th);
    });

    const row = table.insertRow();
    const values = [totalEarnings, averageEarnings, grandTotal, killCount, uniqueItemsCount];
    values.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        td.style.textAlign = 'left';
        row.appendChild(td);
    });

    document.getElementById('summary-table').appendChild(container);
    return table;
}

export function createLootTrackerTable(drops) {
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.overflowX = 'auto';
    container.style.whiteSpace = 'nowrap';
    container.style.marginTop = '20px';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.fontSize = '18px';
    table.style.textAlign = 'left';

    container.appendChild(table);

    const headerRow = table.insertRow();
    const headers = ['Item', 'Quantity', 'Rarity', 'Total Price'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ddd';
        th.style.padding = '12px';
        th.style.backgroundColor = '#f2f2f2';
        th.style.textAlign = 'left';
        headerRow.appendChild(th);
    });

    for (const [key, value] of Object.entries(drops)) {
        const row = table.insertRow();

        const itemCell = row.insertCell();
        itemCell.textContent = key;
        itemCell.style.border = '1px solid #ddd';
        itemCell.style.padding = '8px';
        itemCell.style.textAlign = 'left';
        itemCell.style.color = dropTable.uniqueDropTable.hasOwnProperty(key) ? 'purple' : 'black';

        const quantityCell = row.insertCell();
        quantityCell.textContent = value.quantity;
        quantityCell.style.border = '1px solid #ddd';
        quantityCell.style.padding = '8px';
        quantityCell.style.textAlign = 'left';

        const rarityCell = row.insertCell();
        rarityCell.textContent = value.rarity !== undefined ? value.rarity : 'N/A';
        rarityCell.style.border = '1px solid #ddd';
        rarityCell.style.padding = '8px';
        rarityCell.style.textAlign = 'left';

        const priceCell = row.insertCell();
        priceCell.textContent = value.price;
        priceCell.style.border = '1px solid #ddd';
        priceCell.style.padding = '8px';
        priceCell.style.textAlign = 'left';
    }

    document.getElementById('loot-tracker').appendChild(container);
    return table;
}






