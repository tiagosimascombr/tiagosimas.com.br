const Spreadparser = require("spreadparser");
const fetch = require("node-fetch");

module.exports = async function() {

    const sheetAliases = {
        "contatos": "1",
        "videos": "2",
        "fotos": "3",
        "sobre": "4",
        "configs": "5"
    };

    async function _getSheetByAlias(alias) {
        return await fetch(Spreadparser.getSpreadsheetUrl("1MSs0eP85tmLZKeBiNrfMvinjkw-MU1AzI_jnDW8Mh8w", sheetAliases[alias]))
            .then(response => response.json())
            .then(data => Spreadparser.parse(data, {titleCase: 'camelCase'}))
            .then(sheet => sheet.data);
    }

    return await Object.keys(sheetAliases).reduce(async (_total, alias) => {
        const total = await _total;
        total[alias] = await _getSheetByAlias(alias);
        return await total;
    }, Promise.resolve({}));

};

