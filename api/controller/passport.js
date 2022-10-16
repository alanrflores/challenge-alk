
const passport = (req, res) => {
    //console.log('user', req.user);
    if(!req.user) {
        res.send('Password Invalid')
    }
    let user = {
        id: req.user.id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email
    };
    try {
        res.json(user)
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports = passport;