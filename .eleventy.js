// const fs = require('fs');
const fontAwesomeSolid  = require("@fortawesome/free-solid-svg-icons");
const fontAwesomeRegular  = require("@fortawesome/free-regular-svg-icons");
const fontAwesomeBrands  = require("@fortawesome/free-brands-svg-icons");

module.exports = function(config) {

  const filesToPassthrough = [
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "CNAME",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "site.webmanifest",
    "src/images",
    "src/videos",
    "src/CNAME"
  ];

  const findIcon = (type, iconName, prefix) => {

    const typeToIconset = {
      "solid": fontAwesomeSolid,
      "regular": fontAwesomeRegular,
      "brands": fontAwesomeBrands
    };

    const fontAwesome = typeToIconset[type];

    return fontAwesome[Object.keys(fontAwesome).find(iconKey => {
      return fontAwesome[iconKey].prefix === prefix && fontAwesome[iconKey].iconName === iconName;
    })];
  };

  config.addShortcode("fontAwesomeIcon", function(type, name, prefix, color = "#fff") {
    const icon = findIcon(type, name, prefix);
    return `<svg style="font-size:1em;width:32px;color:${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.icon[0]} ${icon.icon[1]}">
<path fill="currentColor" d="${icon.icon[4]}"></path>
</svg>`;
  });

  filesToPassthrough.forEach(fileOrDir => {
    config.addPassthroughCopy(fileOrDir);
  });

  return {
    dir: {
      input: "src"
    },
    passthroughFileCopy: true
  };
};
