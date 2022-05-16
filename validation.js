const Ajv = require('ajv');
const ajv = new Ajv();

function valid(body) {

    const schema = {
        type: "object",
        properties: {
            id: { type: "string" },
            parent: { type: "string" },
            data: {
                type: "object",

                properties: {
                    userName: { type: "string" },
                    jobSkill: { type: "string" },
                    phoneNumber: { type: "string" }
                }
            }
        },


        additionalProperties: false
    }
    const validate = ajv.validate(schema, body);
    return validate;
}
module.exports = valid;