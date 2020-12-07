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
    const swiftFile = await userFolder.createEntry("UIColor+NewName.swift", {overwrite: true});
    swiftFile.write(swiftConvertModel(colorArray));

    // メソッド呼び出しがあまりうまくいかないので、ここにベタガキする
    // xcassetsConvertModel(colorArray);
    const xcassetsFolder = await userFolder.createFolder("Colors.xcassets");

    for(let i = 0; i < colorArray.length; i++) {
        //カラーコードを16進数、RGBへと変換
        const colorName = colorArray[i].name;
        const red = "0x" + colorArray[i].color.value.toString(16).slice(2,4);
        const green = "0x" + colorArray[i].color.value.toString(16).slice(4,6);
        const blue = "0x" + colorArray[i].color.value.toString(16).slice(6,8);

        const colorSet = await xcassetsFolder.createFolder(colorName + ".colorset");
        
        let json = {
            "colors" : [
              {
                "idiom" : "universal",
                "color" : {
                  "components" : {
                    "red" : red,
                    "green" : green,
                    "blue" : blue,
                    "alpha" : "1.000"
                  },
                  "color-space" : "srgb"
                }
              }
            ],
            "info" : {
              "version" : 1,
              "author" : "xcode"
            }
          }

        const contensJson = await colorSet.createEntry("Contents.json", {overwrite: true});
        contensJson.write(JSON.stringify(json, null , "\t"));
    }
}

function swiftConvertModel(colorArray) {
    let swiftText = '// このファイルは自動生成されるものなので、ReadOnly\nimport UIKit\n\nextension UIColor {\n    public enum NewName: String {\n';
    for(let i = 0; i < colorArray.length; i++) {
        const colorName = colorArray[i].name;
        swiftText += '        case ' + colorName + '\n'
    }
    swiftText += '    }\n\n'
    swiftText += '    public convenience init(name: NewName) {\n        switch name {\n'
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

// 現在はSwiftConverterにベタ書きしているので、これは呼び出していない。
async function xcassetsConvertModel(colorArray) {
    const userFolder = await fs.getFolder;
    const xcassetsFolder = await userFolder.createFolder("Colors.xcassets");

    for(let i = 0; i < colorArray.length; i++) {
        //カラーコードを16進数、RGBへと変換
        const colorName = colorArray[i].name;
        const red = "0x" + colorArray[i].color.r;
        const green = "0x" + colorArray[i].color.g;
        const blue = "0x" + colorArray[i].color.b;

        const colorSet = await xcassetsFolder.createFolder(colorName + ".colorset");
        
        let json = {
            "colors" : [
              {
                "idiom" : "universal",
                "color" : {
                  "components" : {
                    "red" : red,
                    "alpha" : "1.000",
                    "blue" : blue,
                    "green" : green
                  },
                  "color-space" : "srgb"
                }
              }
            ],
            "info" : {
              "version" : 1,
              "author" : "xcode"
            }
          }

        const contensJson = await colorSet.createEntry("Contents.json", {overwrite: true});
        contensJson.write(json);
    }
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}