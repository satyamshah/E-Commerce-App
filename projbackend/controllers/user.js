const User = require("../models/user");
 const Order = require("../models/order");


//id is something coming from url , using params //using export as we are using these in routes 
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {           
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};
 

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
  };
  
  exports.updateUser = (req, res) => {            //for put request.
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },                                     //$ used for variable
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  };


  exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
      .populate("user", "_id name")                //populate used when we want to reference from another documents
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(order);
      });
  };
  
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];                               //array or object created
  req.body.order.products.forEach(product => {          //req.body comes from frontend (order, products all from frontend)
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,      //adding in products array
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },    //find based on id
    { $push: { purchases: purchases } },  //Now update with push(update purchases with local purchases created in pushorderpurchaseList)
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};
