# Semasky

[![Semasky](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](https://www.youtube.com/channel/UC4PtjOfZTbVp9DwtJv82Lzg)

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.
![goo API](http://u.xgoo.jp/img/sgoo.png)
* This project is using goo API

## 製品概要
### X Cloud

### 背景
* 我々が普段よく使っているファイルシステムの木構造は、プログラムとのインターフェースを前提とした設計となっており、人間が使うことは前提とされていないが人間は頑張って使っている。(プログラムが自動でファイルを読むときには木構造は非常に便利,場所が一意に決まるから)
![tree](https://h50146.www5.hpe.com/products/software/oe/hpux/developer/column/unixtext_02/images/fig_01.gif)

* この構造は人間にとって非常に効率が悪く、非直感的なシステムであり、マシン向けに作られたものを人間が無理やり使っている。
* 人間はファイルの"場所"ではなく、ファイルの中身の"意味"によってファイルを識別している。
* よって、直感的にファイルを意味によって管理できるクラウドシステムを提案する。

### 製品説明
* 1から十数名くらいまでのグループに使われることを想定している。
* 管理したいファイルをドラッグ&ドロップでクラウドにあげ、直感的な操作によって簡単に目的のファイルを見つけることができる。
* ファイルに対するイメージだけ持って入れば発掘できる

### 特長

#### 1. 特長1
* AIを駆使した自動タグ付けシステム

#### 2. 特長2
* AIを駆使した類似タグ検索

#### 3. 特長3
* プレビューとか？
* 同じ名前のファイルがあっても競合しない

### 解決出来ること
* ビジネスマンの労働時間の1割以上はファイルの検索に当てられていると言われており、労働生産性をあげる

### 今後の展望
* ファイルシステムにマウントする

## 開発内容・開発技術
### 活用した技術
#### API・データ
今回スポンサーから提供されたAPI、製品などの外部技術があれば記述をして下さい。

* キーワード抽出API gooラボ様
* 語句類似度算出API gooラボ様
* AWSインスタンス Amazon AWS様
* IBM image classifier IBM様

#### フレームワーク・ライブラリ・モジュール
* Shinatora
* Angular

### 独自開発技術（Hack Dayで開発したもの）
#### 2日間に開発した独自の機能・技術
* 全て

## How to use

### Requirements
* node v7.5.0 or later
* npm v4.6.1 or later

### Setup
```
$ npm i
```

### Run
```
$ ng s
```

### Build
```
$ ng build
$ ng build --prod  // for production
```
