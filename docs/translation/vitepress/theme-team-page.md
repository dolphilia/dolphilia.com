# Team Page

チームの紹介をしたい場合、Teamコンポーネントを使用してチームページを構築することができます。これらのコンポーネントを使用するには、2つの方法があります。ひとつはdocページに埋め込む方法、もうひとつは完全なチームページを作る方法です。

## チームメンバーをページ内に表示する

vitepress/theme から公開されている `<VPTeamMembers>` コンポーネントを使用すると、任意のページでチームメンバーのリストを表示することができます。

```html
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  ...
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
```

上記のようにすると、チームメンバーがカード風の要素で表示されます。以下のように表示されるはずです。

```
Evan You
Evan You
Creator

Kia King Ishii
Kia King Ishii
Developer
```

`<VPTeamMembers>` コンポーネントには、SサイズとMサイズの2種類があります。好みによりますが、docページで使用する場合は、通常Sサイズの方がフィットするはずです。また、各メンバーに「説明」や「スポンサー」ボタンなどのプロパティを追加することができます。詳しくは `<VPTeamMembers>` をご覧ください。

チームメンバーをドキュメントページに埋め込むことは、小規模なチームで、チーム全体のページを用意するのが大変な場合や、ドキュメントのコンテキストを参照するために部分的にメンバーを紹介する場合に適しています。

チームメンバーの数が多い場合や、チームメンバーを表示するためのスペースを確保したい場合は、チームページ全体を作成することを検討してください。

## 完全なチームページを作成する

docページにチームメンバーを追加する代わりに、カスタムホームページを作成する方法と同様に、完全なチームページを作成することもできます。

チームページを作成するには、まず、新しいmdファイルを作成します。ファイル名は特に問いませんが、ここではteam.mdとします。このファイルで、frontmatter オプションの layout: page を設定すると、TeamPage コンポーネントを使用してページ構造を構成することができます。

```html
---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  ...
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
```

完全なチームページを作成する場合、すべてのコンポーネントを `<VPTeamPage>` コンポーネントでラップすることを忘れないようにしてください。このコンポーネントによって、ネストされたすべてのチーム関連コンポーネントが、スペーシングのような適切なレイアウト構造を得ることができるようになります。

`<VPPageTitle>` コンポーネントはページタイトルセクションを追加します。タイトルは `<h1>` 見出しです。titleと#leadスロットを使って、チームについてのドキュメントを作成します。

`<VPMembers>` はドキュメントページで使用するときと同じように動作します。メンバーの一覧が表示されます。

### チームメンバーを分割するセクションを追加

チームページには、「セクション」を追加することができます。例えば、コアチームメンバーやコミュニティパートナーなど、異なるタイプのチームメンバーがいるとします。これらのメンバーをセクションに分けることで、各グループの役割をより分かりやすく説明することができます。

そのためには、前回作成した team.md ファイルに `<VPTeamPageSection>` コンポーネントを追加してください。

```html
---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const coreMembers = [...]
const partners = [...]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>...</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>...</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
```

`<VPTeamPageSection>` コンポーネントは、VPTeamPageTitle コンポーネントと同様に #title と #lead スロットを持つことができ、さらにチームのメンバーを表示するための #members スロットも持つことができます。

このとき、#members スロットに `<VPTeamMembers>` コンポーネントを配置することを忘れないように。

## `<VPTeamMembers>`です。

`<VPTeamMembers>` コンポーネントは、与えられたメンバーのリストを表示します。

```html
<VPTeamMembers
  size="medium"
  :members="[
    { avatar: '...', name: '...' },
    { avatar: '...', name: '...' },
    ...
  ]"
/>
```

```ts
interface Props {
  // 各メンバーの大きさ。デフォルトは `medium` である。
  size?: 'small' | 'medium'

  // 表示するメンバーのリスト。
  members: TeamMember[]
}

interface TeamMember {
  // メンバーのアバター画像。
  avatar: string

  // メンバーの名前
  name: string

  // 会員名の下に表示されるタイトル。
  // 例：デベロッパー、ソフトウェアエンジニアなど
  title?: string

  // 会員が所属する組織。
  org?: string

  // 組織のURLです。
  orgLink?: string

  // メンバーに対する説明。
  desc?: string

  // ソーシャルリンク。例：GitHub、Twitterなど。ここでSocial Linksオブジェクトを渡すことができる。
  // See: https://vitepress.vuejs.org/config/theme-configs.html#sociallinks
  links?: SocialLink[]

  // 会員向けスポンサーページのURLです。
  sponsor?: string
}
```

## `<VPTeamPage>`

完全なチームページを作成する際のルートコンポーネントです。1つのスロットしか受け付けません。渡されたすべてのチーム関連コンポーネントのスタイルを決定します。

## `<VPTeamPageTitle>`

ページの "title "セクションを追加します。一番最初の `<VPTeamPage>` の下で使用するとよいでしょう。titleと#leadのスロットを受け付ける。

```html
<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
</VPTeamPage>
```

## `<VPTeamPageSection>`

チームページ内に「セクション」を作成します。title、#lead、#membersのスロットを受け付ける。`<VPTeamPage>` の中にいくつでもセクションを追加することができます。

```html
<VPTeamPage>
  ...
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>Lorem ipsum...</template>
    <template #members>
      <VPTeamMembers :members="data" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
```