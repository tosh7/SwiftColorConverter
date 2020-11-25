const fs = require("uxp").storage.localFileSystem;

async function swiftColorConverter() {
    //カラーパネルから色を取得
    var assets = require("assets"),
        items = assets.colors.get();

    if(items.length === 0) {
        console.log("カラーパネルに色がありません");
        return;
    }

    let colorArray = [];
    items.forEach(item => {
        colorArray.push(item);
    })

    //フォルダの書き出し  
    const userFolder = await fs.getFolder();
    const newFile = await userFolder.createEntry("UIColor+extension.swift", {overwrite: true});
    newFile.write(swiftConvertModel(colorArray));
}

function swiftConvertModel(colorArray) {
    let swiftText = 'import UIKit\n\nextension UIColor {\n    public enum Name: String {\n';
    for(let i = 0; i < colorArray.length; i++) {
        const colorName = colorArray[i].name;
        swiftText += '        case ' + colorName + '\n'
    }
    swiftText += '    }\n\n'
    swiftText += '    public convenience init(name: Name) {\n        switch name {\n'
    for(let i = 0; i < colorArray.length; i++) {
        //カラーコードを16進数、RGBへと変換
        const colorName = colorArray[i].name;
        const colorCode = '0x' + colorArray[i].color.value.toString(16).slice(2);
        const red = (colorArray[i].color.r / 255).toFixed(10);
        const green = (colorArray[i].color.g / 255).toFixed(10);
        const blue = (colorArray[i].color.b / 255).toFixed(10);
        swiftText += '        case .' + colorName + ':\n            self.init(hex: ' + colorCode + ')'
        swiftText += ' //#colorLiteral(red: ' + red + ', green: ' + green + ', blue: ' + blue + ', alpha: 1)\n'
    }
    swiftText += '        }\n    }\n'
    swiftText += '}'
    return swiftText;
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}