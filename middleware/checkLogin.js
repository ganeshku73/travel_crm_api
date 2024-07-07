const jwt = require('jsonwebtoken');

function checkLogin(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodeToken;
        next();
    }catch(e){
        return res.status(401).json({
            'message':"Invalid or expire token provided",
            'error':e
        });
    }

}

module.exports = {
    checkLogin
}