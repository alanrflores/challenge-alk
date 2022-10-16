const { User } = require('../../src/db.js');

const deleteUser = async(req, res) => {
    const { idUser } = req.params;
 try {
    let user = await User.destroy({
      where: {
         id: idUser
      }
    });

   return res.send("User was successfully deleted");
 } catch (error) {
   return res.status(500).send(err);
 };
};

module.exports = deleteUser;