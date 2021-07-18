const dgram = require('dgram');

/**
 * Capacを受信するクラス
 *
 * @class CapacListener
 */
class CapacListener{

    /**
     * 受信時のコールバック。
     *
     * @memberof CapacListener
     */
    listener = ()=>{};

    /**
     * Capacを受信待ちする。
     *
     * @param {string} [ip="localhost"]
     * @param {number} [port=56568]
     * @param {*} listener
     * @memberof CapacListener
     */
    listen(ip="localhost",port=56568,listener){
        this.port = port;
        this.ip = ip;
        if(!listener){
            this.listener = listener;
        }
        const socket = dgram.createSocket('udp4');
        this.socket = socket;
        this.socket.on('listening', () => {
            const address = socket.address();
            console.log('UDP socket listening on ' + address.address + ":" + address.port);
        });
        socket.on('message', (message, remote) => {
            const json = JSON.parse(message);
            const { type,body } = json;
            this.listener(type,body,remote,message);
        });
        socket.bind(this.port, this.ip);
    }
}

/**
 * Capacを送信するクラス
 *
 * @class CapacEmitter
 */
class CapacEmitter{
    /**
     * CapacEmitterクラスを実体化する。
     * (ipアドレスは明示的に指定してね)
     * @param {string} [ip="localhost"]
     * @param {number} [port=56568]
     * @memberof CapacEmitter
     */
    constructor(ip="localhost",port=56568){
        this.port = port;
        this.ip = ip;
        const socket = dgram.createSocket('udp4');
        this.socket = socket;
        this.socket.on('listening', () => {
            const address = socket.address();
            console.log('UDP socket listening on ' + address.address + ":" + address.port);
        });
        socket.bind(56569,ip);
    }

    /**
     * Capacを送る。
     * 
     * @param {*} type
     * @param {*} body
     * @memberof CapacEmitter
     */
    send(type,body){
        const json = JSON.stringify({type,body});
        const data = Buffer.from(json);
        this.socket.send(data, 0, data.length, this.port, "192.168.0.255", (err, bytes) => {
            if (err) throw err;
        });
    }
}

modules.exports.CapacEmitter = CapacEmitter;
modules.exports.CapacListener = CapacListener;