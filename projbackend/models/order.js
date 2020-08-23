const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;   //for using other schema as reference

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product"            //for using other schema as reference
  },
  name: String,
  count: Number,
  price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };    //another way for exporting(this time exporting multiple schema)
