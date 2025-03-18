const express = require("express");
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const Payment = require("../models/payment.model");

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/order',  (req, res) => {
    const {amount} = req.body;

    try{
        const options = {
            amount: Number(amount),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (err, order) => {
            if(err){
                // console.log(err);
                return res.status(500).json({message: "Something went wrong"});
            }
            res.status(200).json({ data: order});
        });
    } catch(err){
        res.status(500).json({message: "internal server error"});
    }
})

router.post('/verify', async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    try{
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;
        
       if(isAuthentic){
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            await payment.save();
            res.status(200).json({message: "Payment successfull"});
        }
    } catch(err){
        res.status(400).json({message: "Payment failed"});
    }
})

module.exports = router;