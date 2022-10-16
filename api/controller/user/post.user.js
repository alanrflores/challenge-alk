const { User } = require('../../src/db.js');

const createdUser = async(req, res) => {
  const { email,name, surname, password, password_virtual } = req.body;
  

  try {
    let user = await User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
           name: name,
           surname: surname,
           password: password,
           password_virtual: password_virtual
        }
    });
    return res.json({msg: "User created successfully!" , data: user });
  } catch (error) {
    res.send(error);
  };
};

module.exports = createdUser;