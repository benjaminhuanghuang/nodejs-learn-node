const express = require('express');
const router = express.Router();


const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');
 
// Do work here
// router.get('/', storeController.homePage);
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));

//
router.get('/add', storeController.addStore);
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

//
router.get('/login', catchErrors(userController.loginForm));
router.get('/register', catchErrors(userController.registerForm));

module.exports = router;
