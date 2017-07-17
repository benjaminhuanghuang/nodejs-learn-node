##
index.js
router.get('/stores/pages/:page', catchErrors(storeController.getStores));

storeController.js
getStores