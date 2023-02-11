Class

# NSTextInputContext

Cocoaのテキスト入力システムを表すオブジェクトです。

`macOS 10.6+`

## 宣言

```objc
@interface NSTextInputContext : NSObject
```

## 概要

テキスト入力システムは、主にNSTextInputClientプロトコルを介して、アクティブ化された入力コンテキストのクライアントと通信を行う。

## トピックス

### 入力コンテキストの作成

- initWithClient:
The designated initializer

### Getting the Input Context and Client

currentInputContext
Returns the current, activated, text input context object.
client
The owner of this input context. (read-only)

### Configuring the Input Context

acceptsGlyphInfo
A Boolean value that indicates whether the client handles NSGlyphInfoAttributeName or not.
allowedInputSourceLocales
The set of keyboard input source locales allowed when this input context is active.

### Activating the Input Context

- activate
Activates the receiver.
- deactivate

### Deactivates the receiver.

Handling Input Sources
- handleEvent:
Tells the Cocoa text input system to handle mouse or key events.
- discardMarkedText
Tells the Cocoa text input system to discard the current conversion session.
- invalidateCharacterCoordinates
Notifies the Cocoa text input system that the position information previously queried via methods like firstRectForCharacterRange:actualRange: needs to be updated.
keyboardInputSources
The array of keyboard text input source identifier strings available to the receiver. (read-only)
selectedKeyboardInputSource
The identifier string for the selected keyboard text input source.
+ localizedNameForInputSource:
Returns the display name for the given text input source identifier.
NSTextInputSourceIdentifier

### Notifications

NSTextInputContextKeyboardSelectionDidChangeNotification
Posted after the selected text input source changes.

## Relationships
Inherits From
NSObject

## 参照

### 入力管理

|       クラス       |                                                    説明                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| NSTextInputClient  | テキストビューがテキスト入力管理システムと適切に相互作用するために実装しなければならないメソッドのセット。 |
| NSTextAlternatives | あるテキストに対する代替文字列のリスト。                                                                   |
| NSTextContent      | 入力コンテンツの種類を具体的に記述したプロトコル。                                                         |
| NSTextInput        | テキストビューがテキスト入力管理システムと適切に相互作用するために実装しなければならないメソッドのセット。 |