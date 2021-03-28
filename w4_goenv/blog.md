### 
- 最近golangを使い始めまして、ネットで色々調べてみまして、環境変数の事はまだ詳しくわからないから、整理しようかと思います。

### GOROOT
- `$GOROOT`は`$JAVA_HOME`と似てて、インストール場所を指しています。
  - 例えば：`GOROOT="/usr/local/golang/"`
- Go 1.0から、`$GOOS`と`GOARCH`などと共に、go toolに使われてcompilerなどを探します。
  - 例えば：`$GOROOT/pkg/tool/$GOOS_$GOARCH`。(`GOTOOLDIR="/usr/local/golang/pkg/tool/darwin_amd64"`)


### 検証
- 説明は色々ありましたが、手を動かして検証しましょう。

#### go.modファイルなし
##### ケース
- default module設定なら、エラーになります。
```
go env -w GO111MODULE="" && go run main.go
main.go:3:8: package stuff is not in GOROOT (/usr/local/golang/src/stuff)
```
- module on設定なら、エラーになります。
```
go env -w GO111MODULE="on" && go run main.go
main.go:3:8: package stuff is not in GOROOT (/usr/local/golang/src/stuff)
```
  - default moduleとmodule onは同じエラーだから、moduleはdefault onであるのを確認しました。
- module on設定で、存在してないpackageをimportしようとするなら。
```
main.go:5:3: no required module provides package github.com/foo: go.mod file not found in current directory or any parent directory; see 'go help modules'
main.go:4:3: package stuff is not in GOROOT (/usr/local/golang/src/stuff)

main.go:5:3: package githubcomfoo is not in GOROOT (/usr/local/golang/src/githubcomfoo)
main.go:4:3: package stuff is not in GOROOT (/usr/local/golang/src/stuff)
```
  - package名はローマ字しかないなら、goは`$GOROOT/src`の下でpackageを探します。`fmt`, `io`などのSDK packageは`src`の下にあるから、わかりやすい仕組みです。slashなどの符号がついてると、goはそれをmoduleのpackageと識別して、go.modの中身を探しに行きます。ファイルがないから、エラーとなりました。

- module off設定なら、エラーになります。
```
go env -w GO111MODULE="off" && go run main.go
main.go:3:8: cannot find package "stuff" in any of:
	/usr/local/golang/src/stuff (from $GOROOT)
	/Users/xxx/go/src/stuff (from $GOPATH)
```
  - moduleを使わないなら、古い時代のworkspaceやり方(`$GOPATH`)にfallbackして、packageを`$GOROOT`と`$GOPATH`の下で探します。


#### go.modファイルあり
- 存在してないpackageをimportしようとすると。
```
main.go:4:3: no required module provides package github.com/ryoktgg/w4_goenv/stuff; to add it:
	go get github.com/ryoktgg/w4_goenv/stuff
```
  - packageが見つからないなら、goは自動でgetしてくれない。


### 纏め：
- importのpackage名はalphabetだったら、goは先に`$GOROOT`の下を探します。`GO111MODULE`とは関係ない。
- `GO111MODULE`を`off`にすると
  - goは自動的に`$GOPATH`のやり方に切り替えますから、`go env -W GOPATH=/you/project/path`でプロジェクトのpathを入れないと、golangはpackageを見つけられないです。
- `GO111MODULE`を`on`にすると
  - packageはremote packageの場合(例えば、`import github.com/google/uuid`、必ず`go.mod`に該当の`require` directiveがある、例えば：`require github.com/google/uuid`)、goは先に`go.mod`をみて、先に`$HOME/go/pkg/mod`下にダウンロードしてからimportする。(`go get package`も同じに先にpackageを`$HOME/go/pkg/mod`の下にdownloadする)
  - packageはlocal packageの場合(例えば、`import github.com/ryoktg/w4_goenv/stuff`、必ず`go.mod` fileに該当の`module` directiveがあります、例えば：`module github.com/ryoktg/w4_goenv`)、goは`go.mod`所属のfolder下でpackageを探します。

### 比較：
#### golang vs java
| golang    | java                       | explanation |
|-----------|----------------------------|-------------|
| `$GOROOT` | `$JAVA_HOME`               |             |
| `module`  | `group_id` + `artifact_id` |             |

#### golang vs nodejs

| golang               | nodejs            | explanation                                                                          |
|----------------------|-------------------|--------------------------------------------------------------------------------------|
| `go get package`     | `npm add package` |                                                                                      |
| `go install package` | `npm add package` | golang will create a binary file, nodejs will create a soft link pointing to js file |
