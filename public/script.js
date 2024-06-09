import { getPlayerDrop, createDropTable, createSummaryTable, createLootTrackerTable } from './main.js';
import { dropTable } from './dropsObject.js';

let grandTotal = 0; // Variable to track the grand total
let killCount = 0; // Variable to track the number of kills
let allDrops = {}; // Object to track all drops
let uniqueItemsCount = 0; // Variable to track unique items count

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('drop-button').addEventListener('click', function() {
        const killInput = document.getElementById('kill-input');
        const additionalKills = parseInt(killInput.value) || 1;

        for (let i = 0; i < additionalKills; i++) {
            simulateKill();
        }

        // Clear the input field after processing
        killInput.value = '';
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        grandTotal = 0; // Reset grand total
        killCount = 0; // Reset kill count
        allDrops = {}; // Reset all drops
        uniqueItemsCount = 0; // Reset unique items count

        const summaryDiv = document.getElementById('summary-table');
        summaryDiv.innerHTML = ''; // Clear previous content

        const summaryTable = createSummaryTable(0, 0, grandTotal, killCount, uniqueItemsCount);
        summaryDiv.appendChild(summaryTable);

        const lootTrackerDiv = document.getElementById('loot-tracker');
        lootTrackerDiv.innerHTML = ''; // Clear previous content

        const lootTrackerTable = createLootTrackerTable(allDrops);
        lootTrackerDiv.appendChild(lootTrackerTable);
    });
});

function simulateKill() {
    const playerDrop = getPlayerDrop(dropTable);
    const { table, totalEarnings } = createDropTable(playerDrop);

    grandTotal += totalEarnings; // Update grand total
    killCount++; // Increment kill count

    // Update the loot tracker
    for (const [item, details] of Object.entries(playerDrop)) {
        if (allDrops[item]) {
            allDrops[item].quantity += details.quantity;
            allDrops[item].price += details.price * details.quantity;
        } else {
            allDrops[item] = { ...details, price: details.price * details.quantity };
            if (dropTable.uniqueDropTable.hasOwnProperty(item)) {
                uniqueItemsCount++; // Increment unique items count for new unique items
            }
        }
    }

    updateTables(table, totalEarnings);
}

function updateTables(table, totalEarnings) {
    const outputDiv = document.getElementById('player-drop');
    outputDiv.innerHTML = ''; // Clear previous content
    outputDiv.appendChild(table);

    const summaryDiv = document.getElementById('summary-table');
    summaryDiv.innerHTML = ''; // Clear previous content

    const averageEarnings = (grandTotal / killCount).toFixed(2);
    const summaryTable = createSummaryTable(totalEarnings, averageEarnings, grandTotal, killCount, uniqueItemsCount);
    summaryDiv.appendChild(summaryTable);

    const lootTrackerDiv = document.getElementById('loot-tracker');
    lootTrackerDiv.innerHTML = ''; // Clear previous content

    const lootTrackerTable = createLootTrackerTable(allDrops);
    lootTrackerDiv.appendChild(lootTrackerTable);
}


