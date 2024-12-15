import { initialStore } from "./constants.js";
import { getPlayerIcons, getStats, getDrawString, getVictoryString, isVictory } from "./service.js";

const field = document.querySelector('.field');
const stats = document.querySelector('.stats');
const reset = document.querySelector('.reset');

let store = JSON.parse(JSON.stringify(initialStore));

function resetStore(store) {
    store.fieldData = new Array(store.fieldSize).fill([]).map(() => {
        return new Array(store.fieldSize).fill({
            playerIndex: '',
            isChecked: false,
        });
    });

    store.iconsOfPlayers = getPlayerIcons(store.numberOfPlayers);
    stats.innerHTML = getStats(store);
}

window.addEventListener('load', () => {
    store.fieldData = new Array(store.fieldSize).fill([]).map(() => {
        return new Array(store.fieldSize).fill({
            playerIndex: '',
            isChecked: false,
        });
    });

    store.iconsOfPlayers = getPlayerIcons(store.numberOfPlayers);

    const buttonSize = `${100 / store.fieldSize}%`;
    store.fieldData.forEach((arr, i) => {
        arr.forEach((_, j) => {
            const button = document.createElement('button');
            button.classList.add("fieldButton");
            button.style.width = buttonSize;
            button.style.height = buttonSize;
            button.dataset.index = `${i}:${j}`;
            field.append(button);
        });
    });

    stats.innerHTML = getStats(store);
});

field.addEventListener('click', (event) => {
    const [i, j] = event.target.dataset.index.split(":");
    if (store.fieldData[i][j].isChecked || store.isGameOver) {
        return;
    }

    store.fieldData[i][j] = {
        playerIndex: store.currentPlayerIndex,
        isChecked: true,
    };
    event.target.innerHTML = store.iconsOfPlayers[store.currentPlayerIndex];

    if (isVictory(store, i, j)) {
        stats.innerHTML = getVictoryString(store);
        store.isGameOver = true;
        return;
    }

    if (store.currentPlayerIndex === store.numberOfPlayers - 1) {
        store.currentPlayerIndex = 0;
    } else {
        store.currentPlayerIndex++;
    }

    store.step++;
    if (store.fieldSize ** 2 === store.step - 1) {
        stats.innerHTML = getDrawString(store);
    } else {
        stats.innerHTML = getStats(store);
    }
});

reset.addEventListener('click', () => {
    store = JSON.parse(JSON.stringify(initialStore));
    const fieldButtons = document.querySelectorAll('.fieldButton');
    [...fieldButtons].forEach(button => {
        button.innerHTML = '';
    });

    resetStore(store);
});
