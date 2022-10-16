const { Operation, User } = require('../../src/db.js');

const createdOperation = async(req, res) => {
  const { concept, amount, date, type, idUser } = req.body;
   console.log(req.body)
    try {

      const operation = await Operation.create({
           concept: concept,
           amount: amount,
           date: date,
           type: type
        });
  
      const user = await User.findByPk(idUser);
      // console.log(user.__proto__)
      user.addOperations(operation);
      
      return res.json(operation);
    } catch (error) {
      console.log(error.message)
      return res.status(500).send(error);
    }
};

module.exports = createdOperation;