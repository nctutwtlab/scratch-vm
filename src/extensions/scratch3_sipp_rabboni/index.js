const formatMessage = require('format-message');
const axios = require('axios');
// const jsonpAdapter = require('axios-jsonp');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');

class Scratch3SippRabboniBlocks {
    constructor (runtime) {
        log.info('VERSION AT 2025.11.21');
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        /**
         * The socket used to communicate with the local server to send rabboni data
         * and recieve transcription results.
         * @type {WebSocket}
         * @private
         */
        this._socket = null;

        this._newWebsocket();

        window.addEventListener('unload', () => {
            if (this._socket.readyState === WebSocket.OPEN) {
                log.info('Close WebSocket', this._socket);
                this._socket.close();
            }
        });
    }

    _newWebsocket () {
        this._socket = new WebSocket('ws://localhost:50500/rab');
        this._socket.addEventListener('open', this._onOpen);
        this._socket.addEventListener('error', this._onError);
        this._socket.addEventListener('message', this._onRecvData);
        this._socket.rabData = {};
    }

    _onOpen () {
        log.debug('_onOpen');
    }

    _onRecvData (e) {
        try {
            const rcvData = JSON.parse(e.data);
            this.rabData[rcvData.name] = rcvData;
            // log.debug('_onRecvData', this);
        } catch (ex) {
            log.error(`Problem parsing json. continuing: ${ex}`);
            return;
        }
    }

    _onError (e) {
        log.error('_onError', e);
    }

    /**
     * The key to load & store a target's pen-related state.
     * @type {string}
     */
    static get STATE_KEY () {
        return 'Scratch.sippRabboni';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'sippRabboni',
            color1: '#4B4A60',
            color2: '#383748',
            name: formatMessage({
                id: 'sippRabboni.categoryName',
                default: 'Sipp Rabboni',
                description: 'Label for the hello world extension category'
            }),
            // menuIconURI: menuIconURI,
            // blockIconURI: blockIconURI,
            showStatusButton: false,
            blocks: [
                // {
                //     opcode: 'watchRab',
                //     text: formatMessage({
                //         id: 'sippRabboni.watchRab',
                //         default: 'Watch rabboni [RAB]',
                //         description: 'Watch rabboni'
                //     }),
                //     blockType: BlockType.HAT,
                //     arguments: {
                //         RAB: {
                //             type: ArgumentType.STRING,
                //             menu: 'rabs'
                //         }
                //     }
                // }
                {
                    opcode: 'status',
                    text: formatMessage({
                        id: 'sippRabboni.statusBlock',
                        default: '[RAB_NAME] sensor settings',
                        description: 'Sensor settings for this Rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        }
                    },
                    func: 'getStatus'
                },
                {
                    opcode: 'deviceInfo',
                    text: formatMessage({
                        id: 'sippRabboni.deviceInfoBlock',
                        default: '[RAB_NAME] about sensor',
                        description: 'Information about this Rabboni sensor'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        }
                    },
                    func: 'getDeviceInfo'
                },
                {
                    opcode: 'trigger',
                    text: formatMessage({
                        id: 'sippRabboni.triggerBlock',
                        default: '[RAB_NAME] trigger (count of movement)',
                        description: 'Whether the Rabboni sensor is triggered'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        }
                    },
                    func: 'getTrigger'
                },
                {
                    opcode: 'storedCount',
                    text: formatMessage({
                        id: 'sippRabboni.storedCountBlock',
                        default: '[RAB_NAME] record (total movement)',
                        description: 'Stored count (total movement) from Rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        }
                    },
                    func: 'getStoredCount'
                },
                {
                    opcode: 'acc',
                    text: formatMessage({
                        id: 'sippRabboni.acc',
                        default: '[RAB_NAME] acceleration [ACC]',
                        description: 'Rabboni acceleration value'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        },
                        ACC: {
                            type: ArgumentType.STRING,
                            menu: 'accList',
                            defaultValue: 'accX'
                        }
                    },
                    func: 'getAcc'
                },
                {
                    opcode: 'gyr',
                    text: formatMessage({
                        id: 'sippRabboni.gyr',
                        default: '[RAB_NAME] gyro [GYR]',
                        description: 'Rabboni gyro value'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        RAB_NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'RAB'
                        },
                        GYR: {
                            type: ArgumentType.STRING,
                            menu: 'gyrList',
                            defaultValue: 'gyrX'
                        }
                    }
                }
                // {
                //     opcode: 'currentCount',
                //     text: formatMessage({
                //         id: 'sippRabboni.currentCountBlock',
                //         default: 'current count',
                //         description: 'Current count in sipp rabboni'
                //     }),
                //     blockType: BlockType.REPORTER,
                //     disableMonitor: true,
                //     arguments: {},
                //     func: 'getCurrentCount'
                // },
                // {
                //     opcode: 'HandGes',
                //     text: formatMessage({
                //         id: 'sippRabboni.HandGes',
                //         default: 'HandGes',
                //         description: 'HandGes'
                //     }),
                //     blockType: BlockType.REPORTER,
                //     disableMonitor: true,
                //     arguments: {},
                //     func: 'getHand'
                // }
            ],
            menus: {
                accList: {
                    items: [
                        {text: 'Acceleration X', value: 'accX'},
                        {text: 'Acceleration Y', value: 'accY'},
                        {text: 'Acceleration Z', value: 'accZ'}
                    ]
                },
                gyrList: {
                    items: [
                        {text: 'Gyro X', value: 'gyrX'},
                        {text: 'Gyro Y', value: 'gyrY'},
                        {text: 'Gyro Z', value: 'gyrZ'}
                    ]
                }
            }
        };
    }

    _getCertainRabData (rabName) {
        return this._socket.rabData[rabName];
    }

    getStatus (args) {
        // log.debug('getStatus', this, this._socket.rabData, args);
        const rabData = this._getCertainRabData(args.RAB_NAME);
        // eslint-disable-next-line no-undefined
        if (rabData === undefined) return 'NOT_READY';
        return `Acc: ${rabData.acc}, Gyr: ${rabData.gyr}`;
        // return 'NOT_READY';
    }

    getDeviceInfo (args) {
        // log.debug('getDeviceInfo', args);
        return axios({
            method: 'get',
            url: `http://localhost:50500/rab/battery?name=${args.RAB_NAME}`
        })
            .then(res => {
                log.debug(res);
                return JSON.stringify(res.data);
            })
            .catch(err => {
                log.error(err);
                return 'NOT_READY';
            });
    }

    getStoredCount (args) {
        const rabData = this._getCertainRabData(args.RAB_NAME);
        // log.debug('getStoredCount', rabData);
        // eslint-disable-next-line no-undefined
        if (rabData === undefined) return 'NOT_READY';
        return rabData.count[1];
    }

    getAcc (args) {
        // log.debug('getAcc', args);
        const rabData = this._getCertainRabData(args.RAB_NAME);
        // eslint-disable-next-line no-undefined
        if (rabData === undefined) return 'NOT_READY';
        switch (args.ACC) {
        case 'accX':
            return rabData.acc[0];
        case 'accY':
            return rabData.acc[1];
        case 'accZ':
            return rabData.acc[2];
        default:
            break;
        }
    }

    getGyr (args) {
        // log.debug('getGyr', args);
        const rabData = this._getCertainRabData(args.RAB_NAME);
        // eslint-disable-next-line no-undefined
        if (rabData === undefined) return 'NOT_READY';
        switch (args.GYR) {
        case 'gyrX':
            return rabData.gyr[0];
        case 'gyrY':
            return rabData.gyr[1];
        case 'gyrZ':
            return rabData.gyr[2];
        default:
            break;
        }
    }

    getTrigger (args) {
        const rabData = this._getCertainRabData(args.RAB_NAME);
        // eslint-disable-next-line no-undefined
        if (rabData === undefined) return 'NOT_READY';
        return rabData.trigger;
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/trigger',
            adapter: jsonpAdapter
        }).then(res => (res.data.value === 1));
    }

    // getCurrentCount () {
    //     return axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/services/pedometer/data/currentStep',
    //         adapter: jsonpAdapter
    //     }).then(res => res.data.value);
    // }

    // getHand () {
    //     return axios({
    //         method: 'get',
    //         url: 'http://localhost:8080/services/pedometer/data/handges',
    //         adapter: jsonpAdapter
    //     }).then(res => res.data.value);
    // }
}

module.exports = Scratch3SippRabboniBlocks;
