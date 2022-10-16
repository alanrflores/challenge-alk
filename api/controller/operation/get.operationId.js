const { Operation } = require('../../src/db.js');

const getOperationById = async(req, res) => {
    const { idOperation } = req.params;
    try {
        const operationId = await Operation.findByPk(idOperation);
        res.json(operationId);
    } catch (error) {
      return res.send(error);
    };
};

module.exports = getOperationById;