# Semasky
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [製品概要](#%E8%A3%BD%E5%93%81%E6%A6%82%E8%A6%81)
  - [X Cloud](#x-cloud)
  - [背景](#%E8%83%8C%E6%99%AF)
  - [製品説明](#%E8%A3%BD%E5%93%81%E8%AA%AC%E6%98%8E)
  - [特長](#%E7%89%B9%E9%95%B7)
    - [1. 特長1](#1-%E7%89%B9%E9%95%B71)
    - [2. 特長2](#2-%E7%89%B9%E9%95%B72)
    - [3. 特長3](#3-%E7%89%B9%E9%95%B73)
  - [解決出来ること](#%E8%A7%A3%E6%B1%BA%E5%87%BA%E6%9D%A5%E3%82%8B%E3%81%93%E3%81%A8)
  - [今後の展望](#%E4%BB%8A%E5%BE%8C%E3%81%AE%E5%B1%95%E6%9C%9B)
- [開発内容・開発技術](#%E9%96%8B%E7%99%BA%E5%86%85%E5%AE%B9%E3%83%BB%E9%96%8B%E7%99%BA%E6%8A%80%E8%A1%93)
  - [活用した技術](#%E6%B4%BB%E7%94%A8%E3%81%97%E3%81%9F%E6%8A%80%E8%A1%93)
    - [API・データ](#api%E3%83%BB%E3%83%87%E3%83%BC%E3%82%BF)
    - [フレームワーク・ライブラリ・モジュール](#%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%BB%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%83%BB%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)
  - [独自開発技術（Hack Dayで開発したもの）](#%E7%8B%AC%E8%87%AA%E9%96%8B%E7%99%BA%E6%8A%80%E8%A1%93hack-day%E3%81%A7%E9%96%8B%E7%99%BA%E3%81%97%E3%81%9F%E3%82%82%E3%81%AE)
- [How to use](#how-to-use)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Run](#run)
  - [Build](#build)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

[![Semasky](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](https://www.youtube.com/channel/UC4PtjOfZTbVp9DwtJv82Lzg)

## 製品概要
### Cloud Tech

### 背景
* 我々が普段よく使っているファイルシステムの木構造はプログラムにとっては効率的だが設計当初は人間が使うことは想定されていなかった。(プログラムが自動でファイルを読むときには場所が一意に決まるから木構造は非常に便利)
![tree](tree.png =300x)

* この構造は人間にとって非常に効率が悪く、非直感的なシステムであり、現状はマシン向けに作られたものを人間が無理やり使っている状態。
![venn](venn.png)
* 人間はファイルの"場所"ではなく、ファイルの中身の"意味"によってファイルを識別している。
* よって、直感的にファイルを意味によって管理できるクラウドシステムを提案する。
![sema](sema.png)

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
* ファイルシステムにマウントし、OS上で動作するようにする

## 開発内容・開発技術
### 活用した技術
#### API・データ
* キーワード抽出API gooラボ様
* 語句類似度算出API gooラボ様
* AWSインスタンス Amazon AWS様
* IBM image classifier IBM様

#### フレームワーク・ライブラリ・モジュール
* Sinatra
* Angular

### 独自開発技術（Hack Dayで開発したもの）
* 拡張子に応じたサムネイルを表示
* 画像はプレビューを表示
* ドラッグ&ドロップでファイルをアップロード
* ログインシステムの開発
* Base64 encodingによるファイルのアップロード&ダウンロードシステム
* 一括アップロード
* ファイルのタグ付けの自動化
* データベース用いたファイル、タグの管理
* 本番環境へのデプロイ

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

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.
* This project is using goo API
![goo API](http://u.xgoo.jp/img/sgoo.png)
