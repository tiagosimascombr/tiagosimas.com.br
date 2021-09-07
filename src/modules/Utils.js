const getUrl = (tabId) => {
    const macroId = 'AKfycbwih-5BgPB6ZJFHa32sKfqSab2azL3fqkCejuuQGV4o5RQagz2wsjpaKL3j_zi7gB2xlg';
    const spreadsheetId = '1MSs0eP85tmLZKeBiNrfMvinjkw-MU1AzI_jnDW8Mh8w';
    return `https://script.google.com/macros/s/${macroId}/exec?id=${spreadsheetId}&sheet=${tabId}`;
}

module.exports = {
    getUrl
};
