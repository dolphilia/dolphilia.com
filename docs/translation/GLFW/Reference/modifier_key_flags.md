# 修飾キー・フラグ

これらの使用方法については、キー入力を参照のこと。

[[TOC]]

## マクロ

| マクロ             | 説明                                                        |
|--------------------|-------------------------------------------------------------|
| GLFW_MOD_SHIFT     | このビットがセットされている場合、1つ以上のシフトキーが押されたままになっている。   |
| GLFW_MOD_CONTROL   | このビットがセットされている場合、1つ以上のControlキーが押されたままになっている。 |
| GLFW_MOD_ALT       | このビットがセットされている場合、1つ以上のAltキーが押されたままになっている。     |
| GLFW_MOD_SUPER     | このビットがセットされている場合、1つ以上のスーパーキーが押されたままになっている。   |
| GLFW_MOD_CAPS_LOCK | このビットがセットされていると、Caps Lockキーが有効になる。            |
| GLFW_MOD_NUM_LOCK  | このビットがセットされていると、Num Lock キーが有効になる。             |

::: details GLFW_MOD_SHIFT
このビットがセットされている場合、1つ以上のシフトキーが押されたままになっている。

```c
#define GLFW_MOD_SHIFT   0x0001
```

:::

::: details GLFW_MOD_CONTROL
このビットがセットされている場合、1つ以上のControlキーが押されたままになっている。

```c
#define GLFW_MOD_CONTROL   0x0002
```

:::

::: details GLFW_MOD_ALT
このビットがセットされている場合、1つ以上のAltキーが押されたままになっている。

```c
#define GLFW_MOD_ALT   0x0004
```

:::

::: details GLFW_MOD_SUPER
このビットがセットされている場合、1つ以上のスーパーキーが押されたままになっている。

```c
#define GLFW_MOD_SUPER   0x0008
```

:::

::: details GLFW_MOD_CAPS_LOCK
このビットが設定されると、Caps Lock キーが有効になり、GLFW_LOCK_KEY_MODS 入力モードが設定される。

```c
#define GLFW_MOD_CAPS_LOCK   0x0010
```

:::

::: details GLFW_MOD_NUM_LOCK
このビットが設定されると、Num Lockキーが有効になり、GLFW_LOCK_KEY_MODS入力モードが設定される。

```c
#define GLFW_MOD_NUM_LOCK   0x0020
```

:::
