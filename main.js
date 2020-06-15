const fs = require("uxp").storage.localFileSystem;

async function swiftColorConverter(selection) {
    //選択中のアイテム
    const items = selection.items;

    if(items.length === 0) {
        console.log("オブジェクトが選択されていません");
        return;
    }

    let colorName;
    let colorCode;
    items.forEach(item => {
        //オブジェクトが塗りつぶされていない場合は無効化
        if(item !== null) {
            //カラーコードを16進数で取得する
            let colorInfo = item.fill.value.toString(16);
            colorName = colorInfo.slice(2) + 'Color';
            colorCode = '0x' + colorInfo.slice(2);
        } else {
            console.log("このオブジェクトから色は取得できませんでした");
        }
    })

    //フォルダの書き出し  
    const userFolder = await fs.getFolder();
    const newFile = await userFolder.createEntry("UIColor+extension.swift", {overwrite: true});
    newFile.write(swiftConvertModel(colorName, colorCode));
}

function swiftConvertModel(colorName, colorCode) {
    let swiftText = 'import UIKit\n\nextension UIColor {\n    public enum Name: String {\n';
    //ここは複数回呼ばれる前提
    swiftText += '        case ' + colorName + '\n'
    swiftText += '    }\n\n'
    swiftText += '    public convenience init(name: Name) {\n        switch name {\n'
    //ここは複数回呼ばれる前提
    swiftText += '        case .' + colorName + ':\n            self.init(hex: ' + colorCode + ')\n'
    swiftText += '        }\n    }\n'
    swiftText += '}'
    return swiftText;
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}