const _ = require('lodash');
const QueryBuilder = require('./Utils/QueryBuilder');

class Repository {
    constructor(model) {
        this.builder = new QueryBuilder.QueryBuilder(model);
        this.model = model;
    }
    get() {
        const operators = this.builder.getAllOperators();
        console.log('is limit',operators.limit)
        return this.model.findAll({ where: operators.condition, include: operators.include, order: operators.order, limit: operators.limit });
    }

    async findById(id) {
        const model = this.model;
        const result = model.find(attribute);
    }
    async create(attribute) {
        if (_.isNil(attribute)) {
            throw new Error('Error create')
        }
        const model = this.model;
        const result = model.destroy(attribute);
        return result

    }
    async update(attribute) {
        if (_.isNil(attribute)) {
            throw new Error('Error update')
        }
        const model = this.model;
        const result = model.update(attribute);
        return result
    }

    async delete() {
        const model = this.model;
        const result = model.delete(attribute);
        return result
    }
    searchQueryParams(params) {
        this.builder.searchQueryParams(params)
        return this
    }

    includeEntity(params) {
        this.builder.includeEntity(params)
    }

    async paginate() {
        const operators = this.builder.getAllOperators();
        const offset = (operators.page - 1) * operators.pageSize;
        const limit = operators.pageSize;
        const param = {
            where: operators.condition, relations: operators.include, order: operators.order, limit, offset
        };
        const result = await this.model.findAndCountAll(param);
        return result
        // return { data: result.rows[0], totalPage: Math.ceil(result.rows[0] / this.perPage), currentPage: this.page, perPage: this.perPage };
    }


    where(column, condition, value) {
        this.builder.where(column, condition, value)
        return this
    }
    orWhere(column, condition, value) {
        this.builder.orWhere(column, condition, value);
        return this
    }

    with(model) {
        this.builder.with(model)
        return this
    }

    whereHas(model, params) {
        this.builder.whereHas(model, params)
        return this
    }

    withScope(param) {
        this.builder.withScope(param)
    }
    supportPaginate(params) {
        this.builder.supportPaginate(params)
        return this
    }
}

module.exports = { Repository }