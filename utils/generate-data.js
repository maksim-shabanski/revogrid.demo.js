import {generateHeader} from "./generate-header.js";

export function generateFakeDataObject(rowsNumber, colsNumber) {
    const result = [];
    const columns = {};
    const all = colsNumber * rowsNumber;
    for (let j = 0; j < all; j++) {
        let col = j%colsNumber;
        let row = j/colsNumber|0;
        if (!result[row]) {
            result[row] = {};
        }
        result[row][col] = row + ':' + col;
        if (!columns[col]) {
            columns[col] = {
                name: generateHeader(col),
                prop: col,
                pin: j === 2 ? 'colPinStart' : j === 20 ? 'colPinEnd' : undefined,
                size: j === 5 ? 200 : undefined,
                readonly: !!(col%2),
                cellTemplate: (h, props) => {
                    return h('div', {
                        style: {
                            // backgroundColor: j%2 ? 'red' : undefined
                        },
                        class: {
                            'inner-cell': true
                        }
                    }, props.model[props.prop] || '');
                }
            }
        }
    }
    const pinnedTopRows = result[10] && [result[10]] || [];
    const pinnedBottomRows = result[1] && [result[1]] || [];
    let headers = Object.keys(columns).map((k) => columns[k]);
    const grouped = headers.splice(6, 4);
    const grouped2 = grouped.splice(0, 2);
    grouped.push({
        name: 'Grouped2',
        children: grouped2
    });


    const grouped4 = headers.splice(1, 3);

    headers.splice(6, 0, ...[{
        name: 'Grouped',
        children: grouped
    }]);
    headers.splice(1, 0, ...[{
        name: 'Grouped3',
        children: grouped4
    }]);
    return {
        rows: result,
        pinnedTopRows,
        pinnedBottomRows,
        headers
    };
}

