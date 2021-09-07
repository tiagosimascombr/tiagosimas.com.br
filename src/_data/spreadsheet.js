const Utils = require("../modules/Utils");
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
        return await fetch(Utils.getUrl(alias))
            .then(response => response.json())
    }

    return await Object.keys(sheetAliases).reduce(async (_total, alias) => {
        const total = await _total;
        total[alias] = await _getSheetByAlias(alias);
        return await total;
    }, Promise.resolve({}));

};

