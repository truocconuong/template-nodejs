const Sequelize = require('sequelize')
const _ = require('lodash');
const Op = Sequelize.Op

class QueryBuilder {
    constructor(model) {
        this.model = model
        this.include = [];
        this.condition = [];
        this.order = [];
        this.limit = null
        this.page = 1;
        this.pageSize = 20;
    }
    searchQueryParams(params) {
        const attributes = this.getColumnModel();
        let queryWhereLike = {
            [Op.or]: []
        };
        for (const param in params) {
            if (_.includes(attributes, param)) {
                const where = {
                    [param]: {
                        [Op.like]: `%${params[param]}%`
                    }
                }
                queryWhereLike[Op.or].push(where)
            }
        }

        if (!_.isEmpty(queryWhereLike[Op.or])) {
            this.condition.push(queryWhereLike)
        }
    }

    supportPaginate(params) {
        const attributes = ['page', 'pageSize', 'limit']
        for (const param in params) {
            if (_.includes(attributes, param)) {
                if (!_.isNaN(+params[param])) this[param] = Number(params[param])
            }
        }
    }

    includeEntity(params) {
        const attributes = ['include']
        for (const param in params) {
            if (_.includes(attributes, param)) {
           const arrayParam = _.split(params[param],',')
                for (const isParam of arrayParam) {
                    eval(`
                    try {
                        const ${isParam} = require('../../../models/${isParam}');\n
                        this.include.push({
                            model: ${isParam}
                           });
                    } catch (error) {
                        // throw new Error("Filename of entity is incorrect")
                    }`)
                }
                return this
            }
        }
    }




    where(column, condition, value) {
        if (_.isUndefined(column) || _.isUndefined(condition) || _.isUndefined(value)) {
            throw new Error('you need to pass the full three parameters column, condition, value')
        } else {
            const operators = this.getCondition(condition);
            const whereAnd = Op.and;
            let wheres = this.generateOperator(whereAnd);
            const where = {
                [column]: {
                    [operators]: value
                }
            }
            wheres[whereAnd].push(where)
            this.condition.push(wheres);
            return this
        }
    }
    orWhere(column, condition, value) {
        if (_.isUndefined(column) || _.isUndefined(condition) || _.isUndefined(value)) {
            throw new Error('you need to pass the full three parameters column, condition, value')
        } else {
            const operators = this.getCondition(condition);
            const whereOr = Op.or;
            let wheres = this.generateOperator(whereOr);
            const where = {
                [column]: {
                    [operators]: value
                }
            }
            wheres[whereOr].push(where)
            this.condition.push(wheres);
            return this
        }
    }

    with(model) {
        this.include.push({
            model: model
        });
        return this
    }

    whereHas(model, params) {
        const whereAnd = Op.or;
        const { column, condition, value } = params;
        const operators = this.getCondition(condition);
        let wheres = this.generateOperator(whereAnd);
        const where = {
            [column]: {
                [operators]: value
            }
        }
        _.map(this.include, entity => entity.model === model ? _.assign(entity, { where: where }) : false);
        return this

    }

    withScope(param) {
        const model = new this.model();
        const getInclude = model._modelOptions.scopes[param];
        if (!_.isUndefined(getInclude)) {
            this.include.push(...getInclude.include)
        }
    }


    generateOperator(operators) {
        let wheres = {};
        wheres[operators] = [];
        if (!_.isEmpty(this.condition)) {
            _.forEach(this.condition, where => {
                if (!_.isUndefined(where[operators])) {
                    wheres[operators] = where[operators];
                    _.remove(this.condition, where);
                }
            })
        }
        return wheres
    }


    getCondition(condition) {
        switch (condition) {
            case '=':
                return Op.eq
            case 'like':
                return Op.like
            case 'in':
                return Op.in
            default: Op.eq
                break;

        }
    }
    getAllOperators() {
        const params = {
            include: this.include,
            condition: this.condition,
            order: this.order,
            limit: this.limit,
            page: this.page,
            pageSize: this.pageSize
        }
        return params
    }

    getColumnModel() {
        const model = new this.model();
        const columns = [];
        _.forIn(model.rawAttributes, (value, key) => columns.push(key))
        return columns
    }
}

module.exports = { QueryBuilder }