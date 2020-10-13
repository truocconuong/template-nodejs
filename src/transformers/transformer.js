const _ = require('lodash');
class Transformer {
    constructor(attributes) {
        this.attributes = attributes
    }
    item(data) {
        const dataConvert = {
            data: _.pick(data, this.attributes)
        }
        return dataConvert
    }
}


module.exports = { Transformer }