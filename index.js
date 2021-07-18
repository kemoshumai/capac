/* 使い方
        ! 56568番ポートを使用するので、適宜ポート開放すること！

        !受信側
        * const capac = new CapacListener();
        * capac.listener = (type,body,remote) => {
        *     console.log(type,body,remote.address);
        * }
        * capac.listen("自分のIPアドレス");
        ? もしくは
        * const capac = new CapacListener();
        * capac.listen("自分のIPアドレス",listener=(type,body,remote) => {
        *     console.log(type,body,remote.address);
        * });
        
        !送信側
        * const sender = new CapacEmitter("自分のIPアドレス");
        * sender.send("type","body")

*/

var capac = require('./lib/capac');
module.exports = capac;