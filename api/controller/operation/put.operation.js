const { Operation } = require('../../src/db.js');

const updateOperation = async(req, res) => {

   const { idOperation } = req.params;
   const { concept, amount, date } = req.body;

    try {
       let user = await Operation.findById(idOperation);
       user.update({
        concept: concept,
        amount: amount,
        date: date,
       });
       user.save();
       return res.send(user);
    } catch (error) {
       res.status(500).send(error); 
    }
};

module.exports = updateOperation;