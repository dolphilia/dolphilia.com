# 検索

VitePressでは、[Algolia DocSearch](https://docsearch.algolia.com/docs/what-is-docsearch)を使用したドキュメントサイトの検索をサポートしています。彼らのスタートガイドを参照してください。`.vitepress/config.ts`では、少なくとも以下のものを用意する必要があります。

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: '...'
    }
  }
})
```

DocSearchの対象にならない場合は、[コミュニティ・プラグイン](https://github.com/emersonbottero/vitepress-plugin-search)を使用するか、[このGitHubスレッド](https://github.com/vuejs/vitepress/issues/670)でカスタムソリューションを検討する必要があるかもしれません。

## i18n

このような設定をすることで、多言語検索を利用することができます。

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // ...
  themeConfig: {
    // ...

    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: '...',
      locales: {
        zh: {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档'
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除'
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接'
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者'
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈'
              }
            }
          }
        }
      }
    }
  }
})
```

[これらのオプション](https://github.com/vuejs/vitepress/blob/main/types/docsearch.d.ts)は、オーバーライドすることができます。これらのオプションの詳細については、Algoliaの公式ドキュメントを参照してください。