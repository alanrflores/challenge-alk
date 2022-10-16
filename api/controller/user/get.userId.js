const { User, Operation }  = require('../../src/db.js');

const getUserById = async(req, res) => {
    const { idUser } = req.params;

     try {
        const userId = await User.findByPk(idUser,{
         attributes: ["id","name","surname","email"],
           include: [{
               model: Operation
           }],
        })
        res.json(userId);
     } catch (error) {
       return res.send(error);
     };
};

module.exports = getUserById;