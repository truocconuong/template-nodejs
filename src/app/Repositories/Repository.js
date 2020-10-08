const _ = require('lodash')
class Repository {
    constructor(model) {
        this.model = model
        this.include = [];
        this.condition = [];
        this.order = [];
    }

    get() {
        return this.model.findAll()
    }

    async paginate({ page, pageSize }) {
        const offset = page * pageSize;
        const limit = pageSize;
        const param = {
            where: this.condition, relations: this.include, order: this.order, offset, limit
        };
        const result = await this.model.findAndCountAll(param);
        return result
        // return { data: result[0], totalRow: result[1], totalPage: Math.ceil(result[1] / per_page), currentPage: page, perPage: per_page };
    }
}

module.exports = { Repository }