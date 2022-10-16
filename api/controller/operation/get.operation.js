const { Operation } = require('../../src/db.js');

const getOperation = async(req, res) => {

    try {
        const operation = await Operation.findAll()
        res.json(operation);
    } catch (error) {
        res.send(error);
    }
};


module.exports = getOperation;