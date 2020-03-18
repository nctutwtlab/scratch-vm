const formatMessage = require('format-message');
const axios = require('axios');
const jsonpAdapter = require('axios-jsonp');

// const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
// const log = require('../../util/log');

class Scratch3SippRabboniBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
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
                {
                    opcode: 'status',
                    text: formatMessage({
                        id: 'sippRabboni.statusBlock',
                        default: 'status',
                        description: 'Current sipp status'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {},
                    func: 'getStatus'
                },
                {
                    opcode: 'trigger',
                    text: formatMessage({
                        id: 'sippRabboni.triggerBlock',
                        default: 'trigger',
                        description: 'Whether sipp rabboni is triggered'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {},
                    func: 'getTrigger'
                },
                {
                    opcode: 'storedCount',
                    text: formatMessage({
                        id: 'sippRabboni.storedCountBlock',
                        default: 'stored count',
                        description: 'Stored count in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getStoredCount'
                },
                {
                    opcode: 'currentCount',
                    text: formatMessage({
                        id: 'sippRabboni.currentCountBlock',
                        default: 'current count',
                        description: 'Current count in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getCurrentCount'
                },
                {
                    opcode: 'accX',
                    text: formatMessage({
                        id: 'sippRabboni.accX',
                        default: 'acc X',
                        description: 'X acceleration in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getAccX'
                },
                {
                    opcode: 'accY',
                    text: formatMessage({
                        id: 'sippRabboni.accY',
                        default: 'acc Y',
                        description: 'Y acceleration in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getAccY'
                },
                {
                    opcode: 'accZ',
                    text: formatMessage({
                        id: 'sippRabboni.accZ',
                        default: 'acc Z',
                        description: 'Z acceleration in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getAccZ'
                },
                {
                    opcode: 'gyroX',
                    text: formatMessage({
                        id: 'sippRabboni.gyroX',
                        default: 'gyro X',
                        description: 'X gyro in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getGyroX'
                },
                {
                    opcode: 'gyroY',
                    text: formatMessage({
                        id: 'sippRabboni.gyroY',
                        default: 'gyro Y',
                        description: 'Y gyro in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getGyroY'
                },
                {
                    opcode: 'gyroZ',
                    text: formatMessage({
                        id: 'sippRabboni.gyroZ',
                        default: 'gyro Z',
                        description: 'Z gyro in sipp rabboni'
                    }),
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    arguments: {},
                    func: 'getGyroZ'
                }
            ],
            menus: {}
        };
    }

    getStatus () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/thing/status/system',
            adapter: jsonpAdapter
        }).then(res => res.data.status);
    }

    getStoredCount () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/step',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getTrigger () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/trigger',
            adapter: jsonpAdapter
        }).then(res => (res.data.value === 1));
    }

    getCurrentCount () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/currentStep',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getAccX () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/ax',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getAccY () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/ay',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getAccZ () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/az',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getGyroX () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/gx',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getGyroY () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/gx',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }

    getGyroZ () {
        return axios({
            method: 'get',
            url: 'http://localhost:8080/services/pedometer/data/gz',
            adapter: jsonpAdapter
        }).then(res => res.data.value);
    }
}

module.exports = Scratch3SippRabboniBlocks;
