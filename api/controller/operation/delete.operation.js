const { Operation } = require('../../src/db.js');

const deleteOperation = async(req, res) => {
    const { idOperation } = req.params;

    try {
     const operation = await Operation.findByPk(idOperation);
     operation.destroy();
     return res.send("Operation was successfully deleted");

    } catch (error) {
     return res.status(500).send(err);
    };
};

module.exports = deleteOperation;