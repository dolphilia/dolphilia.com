# Badge

バッジを使用すると、ヘッダーにステータスを追加することができます。例えば、セクションのタイプやサポートされているバージョンを指定するのに便利です。

## 使い方

グローバルに利用可能な Badge コンポーネントを使用することができます。

```html
### Title <Badge type="info" text="default" />
### Title <Badge type="tip" text="^1.9.0" />
### Title <Badge type="warning" text="beta" />
### Title <Badge type="danger" text="caution" />
```

上記のコードは、以下のようにレンダリングされます。

```
Title default
Title ^1.9.0
Title beta
Title caution
```

## Custom Children

`<Badge>` は、バッジに表示される子要素を受け入れます。

```html
### Title <Badge type="info">custom element</Badge>
```

```
Title custom element
```

## カスタマイズタイプ カラー

`<Badge />` の背景色をカスタマイズすることができます。以下はデフォルトの値です。

```css
:root {
  --vp-badge-info-border: var(--vp-c-divider-light);
  --vp-badge-info-text: var(--vp-c-text-2);
  --vp-badge-info-bg: var(--vp-c-white-soft);

  --vp-badge-tip-border: var(--vp-c-green-dimm-1);
  --vp-badge-tip-text: var(--vp-c-green-darker);
  --vp-badge-tip-bg: var(--vp-c-green-dimm-3);

  --vp-badge-warning-border: var(--vp-c-yellow-dimm-1);
  --vp-badge-warning-text: var(--vp-c-yellow-darker);
  --vp-badge-warning-bg: var(--vp-c-yellow-dimm-3);

  --vp-badge-danger-border: var(--vp-c-red-dimm-1);
  --vp-badge-danger-text: var(--vp-c-red-darker);
  --vp-badge-danger-bg: var(--vp-c-red-dimm-3);
}

.dark {
  --vp-badge-info-border: var(--vp-c-divider-light);
  --vp-badge-info-bg: var(--vp-c-black-mute);

  --vp-badge-tip-border: var(--vp-c-green-dimm-2);
  --vp-badge-tip-text: var(--vp-c-green-light);

  --vp-badge-warning-border: var(--vp-c-yellow-dimm-2);
  --vp-badge-warning-text: var(--vp-c-yellow-light);

  --vp-badge-danger-border: var(--vp-c-red-dimm-2);
  --vp-badge-danger-text: var(--vp-c-red-light);
}
```

## `<Badge>`

`<Badge>` コンポーネントは、以下のプロップを受け付けます。

```ts
interface Props {
  // `<slot>` が渡された場合、この値は無視される。
  text?: string

  // デフォルトは `tip` です。
  type?: 'info' | 'tip' | 'warning' | 'danger'
}
```