const { Operation } = require('../../src/db.js');

const updateOperation = async(req, res) => {

   const { idOperation } = req.params;
   const body = req.body;

    try {
      await Operation.update(body, {
             where :{
              id: idOperation
             }});
             return res.json({cambiado: true})
    } catch (error) {
       res.status(500).send(error); 
    }
};

module.exports = updateOperation;