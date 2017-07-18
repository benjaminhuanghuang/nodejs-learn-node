##
### _storeForm
    change encoding type in _storeForm
    form(action=`/add/${store._id ||''}` method="POST" class="card" enctype="multipart/form-data")
    

### Add Multer middle-ware in storeController.js
    const multer = require('multer');
    const multerOptions ={
        
    }

    Multer adds a body object and a file or files object to the request object. 
    The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

    // Accept a single file with the name fieldname. 
    // The single file will be stored in req.file.
    // https://www.npmjs.com/package/multer
    exports.upload = multer(multerOptions).single('photo');

### Resize the image and generate uuid as file name
    const uuid = require('uuid');
    const jimp = require('jimp');
    
### Up them together
    router.post('/add', storeController.upload,
                        storeController.resize,
                        storeController.createStore);