const _ = require('lodash');

/**
 * Transforms the data inside the request body, used to change choices strings to integers
 * Ex: we have two gender values : Man and Woman, we store them as 0 and 1 in the database
 *     we need to change these values before storing them in the database
 * @param body
 * @param options {Object}, must be in this format:
 *               {
 *                   fieldKeyToChange: {
 *                       0: String      // database option integer: value to change
 *                   }
 *               }
 */
function inverseTransformData(body, options) {
    const keys = Object.keys(options);
    browseObjectAndChangeOptions(body, keys, options);
}

function browseObjectAndChangeOptions(body, keysToChange, options) {
    for (let bodyKey in body) {
        if (typeof body[bodyKey] === 'object') {
            browseObjectAndChangeOptions(body[bodyKey], keysToChange, options);
        } else if (Array.isArray(body[bodyKey])) {
            for (let index in body[bodyKey]) {
                if (typeof body[bodyKey][index] === 'object' || Array.isArray(body[bodyKey][index])) {
                    browseObjectAndChangeOptions(body[bodyKey][index], keysToChange, options);
                }
            }
        } else if (keysToChange.indexOf(bodyKey) !== -1) {
            let option = options[bodyKey][body[bodyKey]];
            body[bodyKey] = option;
        }
    }
}

module.exports = inverseTransformData;

