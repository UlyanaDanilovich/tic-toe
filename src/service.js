export function getPlayerIcons(numberOfPlayers) {
    const array = new Array(numberOfPlayers - 1).fill([]).map((_, index) => index);
    return ['X', ...array];
}

export function getStats(store) {
    return `Ход номер ${store.step}. Сейчас ходит ${store.iconsOfPlayers[store.currentPlayerIndex]}`;
}

export function getDrawString(store) {
    return `На ходу ${store.step} ничья!`;
}

export function getVictoryString(store) {
    return `На ходу ${store.step} победил ${store.iconsOfPlayers[store.currentPlayerIndex]}!`;
}

export function isVictory(store, i, j) {
    const isTripleWin = (el1, el2, el3) => {
        if (![el1, el2, el3].includes(undefined)) {
            return el1.playerIndex === el2.playerIndex && el2.playerIndex === el3.playerIndex;
        }
        return false;
    }

    i = Number(i);
    j = Number(j);

    const target = store.fieldData[i][j];

    // diagonals
    const topLeft = store.fieldData[i - 1]?.[j - 1];
    const topLeftFar = store.fieldData[i - 2]?.[j - 2];

    const topRigth = store.fieldData[i - 1]?.[j + 1];
    const topRigthFar = store.fieldData[i - 2]?.[j + 2];

    const bottomRigth = store.fieldData[i + 1]?.[j + 1];
    const bottomRigthFar = store.fieldData[i + 2]?.[j + 2];

    const bottomLeft = store.fieldData[i + 1]?.[j - 1];
    const bottomLeftFar = store.fieldData[i + 2]?.[j - 2];

    // lines
    const left = store.fieldData[i]?.[j - 1];
    const leftFar = store.fieldData[i]?.[j - 2];

    const top = store.fieldData[i - 1]?.[j];
    const topFar = store.fieldData[i - 2]?.[j];

    const rigth = store.fieldData[i]?.[j + 1];
    const rigthFar = store.fieldData[i]?.[j + 2];

    const bottom = store.fieldData[i + 1]?.[j];
    const bottomFar = store.fieldData[i + 2]?.[j];

    const cond1 = isTripleWin(topLeftFar, topLeft, target);
    const cond2 = isTripleWin(topLeft, target, bottomRigth);
    const cond3 = isTripleWin(target, bottomRigth, bottomRigthFar);

    const cond4 = isTripleWin(bottomLeftFar, bottomLeft, target);
    const cond5 = isTripleWin(bottomLeft, target, topRigth);
    const cond6 = isTripleWin(target, topRigth, topRigthFar);

    const cond7 = isTripleWin(leftFar, left, target);
    const cond8 = isTripleWin(left, target, rigth);
    const cond9 = isTripleWin(target, rigth, rigthFar);

    const cond10 = isTripleWin(bottomFar, bottom, target);
    const cond11 = isTripleWin(bottom, target, top);
    const cond12 = isTripleWin(target, top, topFar);

    return [cond1, cond2, cond3, cond4, cond5, cond6, cond7, cond8, cond9, cond10, cond11, cond12].includes(true);
}