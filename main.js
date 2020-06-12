//クリップボード
let clipboard = require('clipboard');

function swiftColorConverter(selection) {
    console.log("called!");
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}