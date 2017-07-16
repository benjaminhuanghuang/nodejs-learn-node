const express = require('express');
const router = express.Router();


const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const {
    catchErrors
} = require('../handlers/errorHandlers');

// Do work here
// router.get('/', storeController.homePage);
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));

//
router.get('/add', authController.isLoggedIn, storeController.addStore);
router.post('/add', storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));

router.post('/add/:id', storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));

// Display single store
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

//
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// Login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);


// Register
router.get('/register', userController.registerForm);
// 1. validate register data
// 2. register user
// 3. log in user
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login);

// logout
router.get('/logout', authController.logout);


// User edit
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

// reset password
router.post('/account/forgot', catchErrors(authController.forgot)); //generate reset token
router.get('/account/reset/:token', catchErrors(authController.reset)); // show reset form
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update));

// Map
router.get('/map', storeController.mapPage);

// API
router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near', catchErrors(storeController.mapStores));
router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;