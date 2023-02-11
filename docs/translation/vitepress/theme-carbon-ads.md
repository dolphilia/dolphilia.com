# Carbon Ads

VitePressは、Carbon Adsのネイティブサポートを内蔵しています。Carbon Adsの認証情報を設定することで、VitePressはページ上に広告を表示することができます。

```js
export default {
  themeConfig: {
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    }
  }
}
```

これらの値は、以下のようにカーボンCDNスクリプトを呼び出すために使用されます。

```js
`//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
```

Carbon Adsの設定について詳しく知りたい方は、Carbon Adsのウェブサイトをご覧ください。