const { User, Operation }  = require('../../src/db.js');

 const getUser = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id","name","surname","email"],
            include: [{
                model: Operation,
                attributes: ["id","concept","amount","type","createdAt"],
               
            }],
        });
        
        res.json(users);
    } catch (error) {
        return res.send(error);
    };
};



module.exports = getUser;