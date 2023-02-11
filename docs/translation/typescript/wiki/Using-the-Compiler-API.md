# コンパイラAPIの使用

> ## *免責事項*

これはまだ安定したAPIではないことに留意してください - 私たちはこれをバージョン0.5としてリリースしており、時間の経過とともに変化していくことになります。最初のイテレーションとして、いくつかの粗削りな部分があることでしょう。私たちは、APIを改善するために、コミュニティからのあらゆるフィードバックを歓迎します。ユーザーが将来のリリースに移行できるように、私たちは新しいリリースごとにあらゆる[[API Breaking Changes]]を文書化する予定です。

## セットアップ

まず、TypeScript >=1.6 を `npm` からインストールする必要があります。

それが終わったら、あなたのプロジェクトがあるところからリンクする必要があります。
Nodeプロジェクト内からリンクしない場合、グローバルにリンクされるだけである。

```sh
npm install -g typescript
npm link typescript
```

また、いくつかのサンプルでは、Node.jsの宣言ファイルが必要です。
宣言ファイルを取得するには、以下を実行します。

```sh
npm install -D @types/node
```

これで準備は完了です。では、次の例を試してみてください。

コンパイラのAPIにはいくつかの主要なコンポーネントがあります。
 
- アプリケーション全体のTypeScript用語である `Program` 。
- ユーザーのシステムを表す`CompilerHost`。ファイルを読み込んだり、ディレクトリや大文字小文字をチェックしたりするためのAPIを備えている。
- アプリケーションの各ソースファイルを表す多くの `SourceFile` は、テキストとTypeScript ASTの両方をホストしています。

## 最小限のコンパイラ

このサンプルは、TypeScriptファイルのリストを受け取り、対応するJavaScriptにコンパイルする素のコンパイラである。

これはデフォルトのコンパイラホストであり、ファイルシステムを使用してファイルを取得します。

```TypeScript
import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
```

## 簡単な変換機能

コンパイラの作成はそれほど多くの行数ではありませんが、TypeScriptのソースから対応するJavaScriptの出力を得たい場合があります。
この場合、`ts.transpileModule`を使用すると、2行でstring => stringの変換を得ることができます。

```TypeScript
import * as ts from "typescript";

const source = "let x: string  = 'string'";

let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

console.log(JSON.stringify(result));
```

## JavaScriptファイルからDTSを取得する

これはTypeScript 3.7以上でのみ動作します。この例では、JavaScriptファイルのリストを取得し、それらが生成したd.tsファイルをターミナルに表示する方法を示しています。

```ts
import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  // Create a Program with an in-memory emit
  const createdFiles = {}
  const host = ts.createCompilerHost(options);
  host.writeFile = (fileName: string, contents: string) => createdFiles[fileName] = contents
  
  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, options, host);
  program.emit();

  // Loop through all the input files
  fileNames.forEach(file => {
    console.log("### JavaScript\n")
    console.log(host.readFile(file))

    console.log("### Type Definition\n")
    const dts = file.replace(".js", ".d.ts")
    console.log(createdFiles[dts])
  })
}

// Run the compiler
compile(process.argv.slice(2), {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
});
```

## TypeScriptファイルのセクションを再印刷する

この例は、TypeScriptやJavaScriptのソースファイルの一部をログアウトさせるものである。
このパターンは、アプリのコードが真実の源であることを望む場合に有用です。例えば、JSDocのコメントでエクスポートを紹介する場合などです。

```ts
import * as ts from "typescript";

/**
 * Prints out particular nodes from a source file
 * 
 * @param file a path to a file
 * @param identifiers top level identifiers available
 */
function extract(file: string, identifiers: string[]): void {
  // Create a Program to represent the project, then pull out the
  // source file to parse its AST.
  let program = ts.createProgram([file], { allowJs: true });
  const sourceFile = program.getSourceFile(file);
  
  // To print the AST, we'll use TypeScript's printer
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // To give constructive error messages, keep track of found and un-found identifiers
  const unfoundNodes = [], foundNodes = [];

  // Loop through the root AST nodes of the file
  ts.forEachChild(sourceFile, node => {
    let name = "";
    
    // This is an incomplete set of AST nodes which could have a top level identifier
    // it's left to you to expand this list, which you can do by using
    // https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
    // as below
    if (ts.isFunctionDeclaration(node)) {
      name = node.name.text;
      // Hide the method body when printing
      node.body = undefined;
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile);
    } else if (ts.isInterfaceDeclaration(node)){
      name = node.name.text
    }

    const container = identifiers.includes(name) ? foundNodes : unfoundNodes;
    container.push([name, node]);
  });

  // Either print the found nodes, or offer a list of what identifiers were found
  if (!foundNodes.length) {
    console.log(`Could not find any of ${identifiers.join(", ")} in ${file}, found: ${unfoundNodes.filter(f => f[0]).map(f => f[0]).join(", ")}.`);
    process.exitCode = 1;
  } else {
    foundNodes.map(f => {
      const [name, node] = f;
      console.log("### " + name + "\n");
      console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)) + "\n";
    });
  }
}

// Run the extract function with the script's arguments
extract(process.argv[2], process.argv.slice(3));
```

## リトルリンターでASTをトラバースする

`Node` インターフェースはTypeScript ASTのルートインターフェースである。一般的には、`forEachChild`関数を再帰的に使用して、ツリーを繰り返し処理する。これはビジターパターンを包含しており、しばしばより柔軟性を与える。

ファイルのASTをどのようにたどるかの例として、次のような最小限のリンターを考えてみよう。

* すべてのループ構成体が中括弧で囲まれていることを確認します。
* すべての if/else が中括弧で囲まれていることを確認します。
* 緩い演算子(`==`/`!=`)の代わりに、より厳しい演算子(`===`/`!==`)が使用されます。

```ts
import { readFileSync } from "fs";
import * as ts from "typescript";

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
        if ((node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block) {
          report(
            node,
            'A looping statement\'s contents should be wrapped in a block body.'
          );
        }
        break;

      case ts.SyntaxKind.IfStatement:
        const ifStatement = node as ts.IfStatement;
        if (ifStatement.thenStatement.kind !== ts.SyntaxKind.Block) {
          report(ifStatement.thenStatement, 'An if statement\'s contents should be wrapped in a block body.');
        }
        if (
          ifStatement.elseStatement &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.Block &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.IfStatement
        ) {
          report(
            ifStatement.elseStatement,
            'An else statement\'s contents should be wrapped in a block body.'
          );
        }
        break;

      case ts.SyntaxKind.BinaryExpression:
        const op = (node as ts.BinaryExpression).operatorToken.kind;
        if (op === ts.SyntaxKind.EqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken) {
          report(node, 'Use \'===\' and \'!==\'.');
        }
        break;
    }

    ts.forEachChild(node, delintNode);
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
  }
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
  // Parse a file
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  // delint it
  delint(sourceFile);
});
```

この例では、各 `SourceFile` を走査するだけなので、型チェッカを作成する必要はない。

すべての可能な ``ts.SyntaxKind`` は enum [here] (https://github.com/microsoft/TypeScript/blob/7c14aff09383f3814d7aae1406b5b2707b72b479/lib/typescript.d.ts#L78) で見つけることができます。

## インクリメンタルプログラムウォッチャーの書き方

1つは再構築のトリガーとなるAPIのセットを提供する「ウォッチャー」プログラムを作成するためのもので、もう1つはウォッチャーが活用できる「ビルダー」APIである。
ビルダープログラムは `Program` インスタンスで、エラーをキャッシュしたり、以前のコンパイルでモジュールやその依存関係がカスケード的に更新されていない場合に、それを発行するのに十分な賢さを持っています。
watcher は builder プログラムインスタンスを利用して、コンパイル時に影響を受けたファイルの結果（エラーやemitなど）だけを更新することができます。
これにより、多くのファイルを扱う大規模なプロジェクトを高速化することができます。

このAPIはコンパイラの内部で `--watch` モードを実装するために使われるが、以下のように他のツールでも活用できる。

```ts
import ts = require("typescript");

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

function watchMain() {
  const configPath = ts.findConfigFile(
    /*searchPath*/ "./",
    ts.sys.fileExists,
    "tsconfig.json"
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

  // TypeScript can use several different program creation "strategies":
  //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  //  * ts.createSemanticDiagnosticsBuilderProgram
  //  * ts.createAbstractBuilder
  // The first two produce "builder programs". These use an incremental strategy
  // to only re-check and emit files whose contents may have changed, or whose
  // dependencies may have changes which may impact change the result of prior
  // type-check and emit.
  // The last uses an ordinary program which does a full type check after every
  // change.
  // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and
  // `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
  // For pure type-checking scenarios, or when another tool/process handles emit,
  // using `createSemanticDiagnosticsBuilderProgram` may be more desirable.
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  // Note that there is another overload for `createWatchCompilerHost` that takes
  // a set of root files.
  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  // You can technically override any given hook on the host, though you probably
  // don't need to.
  // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
  // doesn't use `this` at all.
  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
    console.log("** We're about to create the program! **");
    return origCreateProgram(rootNames, options, host, oldProgram);
  };
  const origPostProgramCreate = host.afterProgramCreate;

  host.afterProgramCreate = program => {
    console.log("** We finished making the program! **");
    origPostProgramCreate!(program);
  };

  // `createWatchProgram` creates an initial program, watches files, and updates
  // the program over time.
  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()));
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

watchMain();
```

## 言語サービスによるインクリメンタルビルド対応

> 詳しくは，[[言語サービスAPIの利用]]のページをご覧ください．

サービス層は，複雑なシナリオを単純化するのに役立つ，追加のユーティリティのセットを提供します．以下の例では，ファイル群を監視し，変更されたファイルの出力のみを更新するインクリメンタルビルドサーバを構築しています．
これは，LanguageServiceオブジェクトを作成することで実現します．先ほどのプログラムと同様に、LanguageServiceHostが必要です。LanguageServiceHostは，ファイルの概念を拡張し，`version`，`isOpen`フラグ，`ScriptSnapshot`を追加しています．バージョン`は，言語サービスがファイルの変更を追跡できるようにするものです．isOpen` は言語サービスに対して、ファイルが使用されている間、ASTをメモリ上に保持するように指示する。スクリプトスナップショット ` はテキストを抽象化したもので、言語サービス側で変更点を問い合わせることができる。

もし、単にウォッチスタイルの機能を実装しようとしているのであれば、上記のウォッチャーAPIを調べることをお勧めする。

```ts
import * as fs from "fs";
import * as ts from "typescript";

function watch(rootFileNames: string[], options: ts.CompilerOptions) {
  const files: ts.MapLike<{ version: number }> = {};

  // initialize the list of files
  rootFileNames.forEach(fileName => {
    files[fileName] = { version: 0 };
  });

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: fileName =>
      files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: fileName => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  // Create the language service files
  const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());

  // Now let's watch the files
  rootFileNames.forEach(fileName => {
    // First time around, emit all files
    emitFile(fileName);

    // Add a watch on the file to handle next change
    fs.watchFile(fileName, { persistent: true, interval: 250 }, (curr, prev) => {
      // Check timestamp
      if (+curr.mtime <= +prev.mtime) {
        return;
      }

      // Update the version to signal a change in the file
      files[fileName].version++;

      // write the changes to disk
      emitFile(fileName);
    });
  });

  function emitFile(fileName: string) {
    let output = services.getEmitOutput(fileName);

    if (!output.emitSkipped) {
      console.log(`Emitting ${fileName}`);
    } else {
      console.log(`Emitting ${fileName} failed`);
      logErrors(fileName);
    }

    output.outputFiles.forEach(o => {
      fs.writeFileSync(o.name, o.text, "utf8");
    });
  }

  function logErrors(fileName: string) {
    let allDiagnostics = services
      .getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName));

    allDiagnostics.forEach(diagnostic => {
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        );
        console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character +1}): ${message}`);
      } else {
        console.log(`  Error: ${message}`);
      }
    });
  }
}

// Initialize files constituting the program as all .ts files in the current directory
const currentDirectoryFiles = fs
  .readdirSync(process.cwd())
  .filter(fileName => fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === ".ts");

// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });
```

## モジュール解像度のカスタマイズ

コンパイラがモジュールを解決する標準的な方法をオーバーライドするには、オプションのメソッド `CompilerHost.resolveModuleNames` を実装します。
> `CompilerHost.resolveModuleNames(moduleNames: string[], containingFile: string): string[]`.

このメソッドにはファイル中のモジュール名のリストが渡され、サイズ `moduleNames.length` の配列を返すことが期待されます。

* 空ではないプロパティ `resolvedFileName` を持つ `ResolvedModule` のインスタンス - 配列 `moduleNames` から対応する名前を解決する。
* モジュール名が解決できない場合は `undefined` となります。

標準的なモジュール解決プロセスは、 `resolveModuleName` を呼び出すことで行うことができます。
> `resolveModuleName(moduleName: string, containingFile: string, options:CompilerOptions, moduleResolutionHost:ModuleResolutionHost):ResolvedModuleNameWithFallbackLocations`.

この関数は、モジュール解決の結果 (`resolvedModule` プロパティの値) と、現在の決定を下す前に候補とされたファイル名のリストを格納したオブジェクトを返す。

```ts
import * as ts from "typescript";
import * as path from "path";

function createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[]): ts.CompilerHost {
  return {
    getSourceFile,
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getDirectories: path => ts.sys.getDirectories(path),
    getCanonicalFileName: fileName =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    fileExists,
    readFile,
    resolveModuleNames
  };

  function fileExists(fileName: string): boolean {
    return ts.sys.fileExists(fileName);
  }

  function readFile(fileName: string): string | undefined {
    return ts.sys.readFile(fileName);
  }

  function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = ts.sys.readFile(fileName);
    return sourceText !== undefined
      ? ts.createSourceFile(fileName, sourceText, languageVersion)
      : undefined;
  }

  function resolveModuleNames(
    moduleNames: string[],
    containingFile: string
  ): ts.ResolvedModule[] {
    const resolvedModules: ts.ResolvedModule[] = [];
    for (const moduleName of moduleNames) {
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      } else {
        // check fallback locations, for simplicity assume that module at location
        // should be represented by '.d.ts' file
        for (const location of moduleSearchLocations) {
          const modulePath = path.join(location, moduleName + ".d.ts");
          if (fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath });
          }
        }
      }
    }
    return resolvedModules;
  }
}

function compile(sourceFiles: string[], moduleSearchLocations: string[]): void {
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.AMD,
    target: ts.ScriptTarget.ES5
  };
  const host = createCompilerHost(options, moduleSearchLocations);
  const program = ts.createProgram(sourceFiles, options, host);

  /// do something with program...
}
```

### TypeScript ASTの作成と印刷

TypeScriptにはファクトリー関数とプリンタAPIがあり、これらを組み合わせて使うことができます。

- ファクトリーでは、TypeScriptのASTフォーマットで新しいツリーノードを生成することができる。
- プリンタは既存のツリー(`createSourceFile`やファクトリ関数で生成されたもの)を受け取り、出力文字列を生成することができる。

以下は、両方を利用して階乗関数を生成する例である。

```ts
import ts = require("typescript");

function makeFactorialFunction() {
  const functionName = ts.factory.createIdentifier("factorial");
  const paramName = ts.factory.createIdentifier("n");
  const parameter = ts.factory.createParameterDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName
  );

  const condition = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.LessThanEqualsToken, ts.factory.createNumericLiteral(1));
  const ifBody = ts.factory.createBlock([ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))], /*multiline*/ true);

  const decrementedArg = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.MinusToken, ts.factory.createNumericLiteral(1));
  const recurse = ts.factory.createBinaryExpression(paramName, ts.SyntaxKind.AsteriskToken, ts.factory.createCallExpression(functionName, /*typeArgs*/ undefined, [decrementedArg]));
  const statements = [ts.factory.createIfStatement(condition, ifBody), ts.factory.createReturnStatement(recurse)];

  return ts.factory.createFunctionDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ undefined,
    [parameter],
    /*returnType*/ ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.factory.createBlock(statements, /*multiline*/ true)
  );
}

const resultFile = ts.createSourceFile("someFileName.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const result = printer.printNode(ts.EmitHint.Unspecified, makeFactorialFunction(), resultFile);
console.log(result);
```

### タイプチェッカーの使用

この例では、AST を走査し、チェッカを使用してクラス情報をシリアライズします。
タイプチェッカーを使ってシンボルと型の情報を取得し、エクスポートされたクラス、そのコンストラクタ、およびそれぞれのコンストラクタ・パラメータについて JSDoc コメントを取得します。

```ts
import * as ts from "typescript";
import * as fs from "fs";

interface DocEntry {
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions
): void {
  // Build a program using the set of root file names in fileNames
  let program = ts.createProgram(fileNames, options);

  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();
  let output: DocEntry[] = [];

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, visit);
    }
  }

  // print out the doc
  fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));

  return;

  /** visit nodes finding exported classes */
  function visit(node: ts.Node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
      return;
    }

    if (ts.isClassDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      let symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        output.push(serializeClass(symbol));
      }
      // No need to walk any further, class expressions/inner declarations
      // cannot be exported
    } else if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    }
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      )
    };
  }

  /** Serialize a class symbol information */
  function serializeClass(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);

    // Get the construct signatures
    let constructorType = checker.getTypeOfSymbolAtLocation(
      symbol,
      symbol.valueDeclaration!
    );
    details.constructors = constructorType
      .getConstructSignatures()
      .map(serializeSignature);
    return details;
  }

  /** Serialize a signature (call or construct) */
  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
    };
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node: ts.Node): boolean {
    return (
      (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0 ||
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
```

試してみてください。

```shell
tsc docGenerator.ts --m commonjs
node docGenerator.js test.ts
```

Passing an input like:

```ts
/**
 * Documentation for C
 */
class C {
    /**
     * constructor documentation
     * @param a my parameter documentation
     * @param b another parameter documentation
     */
    constructor(a: string, b: C) { }
}
```

みたいな出力が出るはずです。

```json
[
    {
        "name": "C",
        "documentation": "Documentation for C ",
        "type": "typeof C",
        "constructors": [
            {
                "parameters": [
                    {
                        "name": "a",
                        "documentation": "my parameter documentation",
                        "type": "string"
                    },
                    {
                        "name": "b",
                        "documentation": "another parameter documentation",
                        "type": "C"
                    }
                ],
                "returnType": "C",
                "documentation": "constructor documentation"
            }
        ]
    }
]
```
