const { User } = require('../../src/db.js');

const updateUser = async(req, res) => {
    const { idUser } = req.params;
    const { name, email, surname } = req.body;
  try {
     const user = await User.findByPk(idUser);
     
     user.update({
        name: name,
        surname: surname,
        email: email,
     });

    await user.save();
    return res.send(user);

  } catch (error) {
    return res.status(500).send(error);
  };
};

module.exports = updateUser;