# SwiftColorConverter
XDのプラグイン。オブジェクトのカラーコードをSwiftに変化させます。

## 使用方法
1. レポジトリを`/Users/ユーザー名/Library/Application Support/Adobe/Adobe XD/develop`下にクローンします。
2. 色を取得したいオブジェクトを選択し、XDのメニューから、`プラグイン/開発版/プラグインを再度読み込み`を選択
![](Images/howToUse1)
3. XDの、メニューから`SwiftColorConverter`を選択
![](Images/howToUse2)
4. 指定した場所に、`UIColor+extension.Swift`という名のファイルが生成されます。

## 注意点
- 色を取得したいオブジェクトを下記画像のように円形のものにしてください。
![](Images/ColorImage)
- 現在、取得したオブジェクトの名前は`ColorCode+Color`のような名前で生成しています。
