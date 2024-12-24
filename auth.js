const jwt = require("jsonwebtoken");

// [Section] Environment Setup
const dotenv = require("dotenv");
dotenv.config();

module.exports.createAccessToken = (user) =>{
		// this contain the information of the user that logged in on the application
		const data = {
			id: user._id,
			email: user.email,
			isAdmin: user.isAdmin
		}

		// Generate a json web token using the jwt's sign method
		// .sign() method jwt
		return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
	}

module.exports.verify = (req, res, next) => {
    // console.log(req.headers.authorization);

    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({ auth: "Failed. No Token" });
    } else {
        // console.log(token);      
        token = token.slice(7, token.length);
        // console.log(token);

        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedToken){ 
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            } else {
                // console.log("result from verify method:")
                // console.log(decodedToken);
                
                req.user = decodedToken;
                next();
            }
        })
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}