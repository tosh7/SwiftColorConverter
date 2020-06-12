
function swiftColorConverter(selection) {
    //選択中のアイテム
    const items = selection.items;

    //要素を一つだけ選択していた場合
    if(items.length === 1) {
        items.forEach(item => {
            //オブジェクトが塗りつぶされていない場合は無効化
            if(item !== null) {
                //カラーコードを16進数で取得する
                let colorInfo = item.fill.value.toString(16);
                let colorName = colorInfo.slice(2) + 'Color';
                let colorCode = '0x' + colorInfo.slice(2);
                console.log(colorName);
                console.log(colorCode);
            } else {
                console.log("このオブジェクトから色は取得できませんでした");
            }
        })
    } else if(items.length > 1) {
        console.log("複数のオブジェクトが選択されています");
    } else {
        console.log("オブジェクトが選択されていません");
    }
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}