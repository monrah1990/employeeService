const Ajv = require('ajv');
const ajv = new Ajv();
const status = require('./status');

function validBody(body) {
    const schema = {
        type: 'object',
        properties: {
            id: { type: 'string' },
            parent: { type: 'string' },
            data: {
                type: "object",

                properties: {
                    userName: { type: 'string' },
                    jobSkill: { type: 'string' },
                    phoneNumber: { type: 'string' }
                },
                required: ['userName', 'jobSkill', 'phoneNumber'],
                additionalProperties: false
            }
        },

        required: ['id', 'parent', 'data'],
        additionalProperties: false
    }
    let validate = ajv.validate(schema, body);
    return validate;

}

function validParam(parm) {

    const schema = {

        type: 'object',
        properties: {
            id: { type: 'string' },
        },
        required: ['id'],
        additionalProperties: false
    }
    let validate = ajv.validate(schema, parm);
    return validate;
}


module.exports = {
    validBody,
    validParam
}