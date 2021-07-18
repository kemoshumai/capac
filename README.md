# Capac

"Capac" - A common standard for sending and receiving data using broadcast addresses. 
 
Capacはブロードキャストアドレスを使ったデータの送受信の共通規格です。
IoT機器のデータの同期などに使えます。
自分用にNode.jsで実装したものです。
 
# DEMO

コールバックを指定して受信を待ちます。
```js
const capac = new CapacListener();

capac.listener = (type,body,remote) => {
    if (type == "test"){
        // HelloWorld from 192.168.0.3
        console.log(body + " from " + remote.address);
    }
}

capac.listen("192.168.0.2");// Your IP address.
```

Typeという、一意の識別子をつけて、データを送信します。
```js
// Your IP address.
const sender = new CapacEmitter("192.168.0.3");
sender.send("test","HelloWorld");
```

# Features
 
- UDPとブロードキャストを使ったシンプルな実装
- 高速な通信
- 多言語への移行が容易
 
# Requirement
 
* dgram 1.0.1
 
# Installation

```
yarn add kemoshumai/capac.git
```
 
# Usage

```js
const capac = require("capac");

// 受信
const foo = new capac.CapacListener();

// 送信
const bar = new capac.CapacEmitter();
```
 
# Note
 
- npmモジュールとして公開されていません。yarnでgithubからインストールしてください(Installationを参照)
 
# Author
 
* Kemoshumai
* twitter: @kemoshumai
 
# License
"capac" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).