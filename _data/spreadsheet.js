const SpreadsheetParser = require("../src/SpreadsheetParser");

module.exports = async function() {
    const SimasSpreadsheet = new SpreadsheetParser("1MSs0eP85tmLZKeBiNrfMvinjkw-MU1AzI_jnDW8Mh8w");

    const sheetAliases = {
        "contatos": "1",
        "videos": "2",
        "fotos": "3"
    };

    async function _getSheetByAlias(alias) {
        return await SimasSpreadsheet.getByNumber(sheetAliases[alias])
            .then(sheet => Object.values(sheet.lines));
    }

    return await Object.keys(sheetAliases).reduce(async (_total, alias) => {
        const total = await _total;
        total[alias] = await _getSheetByAlias(alias);
        return await total;
    }, Promise.resolve({}));

};

