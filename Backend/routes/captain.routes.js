const express = require("express");
const captainController = require("../controllers/captain.controller");
const router = express.Router();
const { body } = require("express-validator")
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.vehicle_No').isLength({ min: 8 }).withMessage('vehicle no must be at least 8 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(["car","bus","motorcycle","auto"]).withMessage('InValid'),
],
captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],
captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;