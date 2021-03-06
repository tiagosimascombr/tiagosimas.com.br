const fetch = require("node-fetch");

const SheetParser = function SheetParser(spreadsheetId, sheetNumber = 1) {
    const vocabulary = {
        "cell": "gs$cell",
        "text": "$t",
        "col": "col",
        "row": "row",
        "spreadsheetUrl": `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/${sheetNumber}/public/full?alt=json`
    };

    const _transformCell = (cell) => {
        const transforms = [{
            from: "TRUE",
            to: true
        }, {
            from: "FALSE",
            to: false
        }];

        const transform = transforms.find(transform => {
            return transform.from === cell;
        }) || null;

        return transform === null ? cell : transform.to;
    };

    const _parseKey = (total, cell) => {
        total.keys = total.keys || {};
        total.keys[cell[vocabulary.col]] = cell[vocabulary.text];
    };

    const _parseLine = (total, cell) => {
        total.lines = total.lines || {};
        if(typeof total.keys[cell[vocabulary.col]] !== "undefined") {
            total.lines[cell[vocabulary.row]] = total.lines[cell[vocabulary.row]] || {};
            total.lines[cell[vocabulary.row]][total.keys[cell.col]] = _transformCell(cell[vocabulary.text]);
        }
    };

    const _parser = sheet => sheet.feed.entry.map(cell => cell[vocabulary.cell]).reduce((total, cell) => {
        cell[vocabulary.row] === "1" ? _parseKey(total, cell) : _parseLine(total, cell);
        return total;
    }, {});

    return fetch(vocabulary.spreadsheetUrl)
        .then(response => response.json())
        .then(data => _parser(data));

};

class SpreadsheetParser {

    constructor(spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
    }

    getByNumber(sheetNumber) {
        return SheetParser(this.spreadsheetId, sheetNumber);
    }

}

module.exports = SpreadsheetParser;
