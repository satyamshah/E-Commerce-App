const User = require("../models/user");    //for manipulation in database we need to import it from models
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
//for new signup
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);  //creating new user in database
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};
//for sign in
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);  //using jsonwebtoken
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });  //storing token in cookie of browser so as to confirm that user is logged in.

    //send response to front end
    const { _id, name, email, role } = user;    //Deconstructuring
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout"
  });
};


//protected routes(implemented to know if the user has prvilege or signed in or not)
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"                     //This property is added in req.auth and through this we can verify
});


//custom middleware
exports.isAuthenticated = (req,res,next)=>{         //writing export as it can be used elsewhere
  let checker= req.profile && req.auth && req.profile._id==req.auth._id;
                                 //req.profile and id is being setup from frontend, req.auth and id is set up in isSignedIn        
                                //this means user can change his own configs or properties(eg: profile picture)
 if(!checker)
 {
   return res.status(403).json({
     error:"ACESS DENIED"
   })
 }
  next();      
};           

exports.isAdmin=(req,res,next)=>{     //here we dont need to go for 
  if(req.profile.role===0){
    return res.status(403).json({
      error:"You are not Admin"
    })
  }
  next();
};