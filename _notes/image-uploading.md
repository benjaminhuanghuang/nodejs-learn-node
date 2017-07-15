##
### _storeForm
    change encoding type in _storeForm
    form(action=`/add/${store._id ||''}` method="POST" class="card" enctype="multipart/form-data")
    

### Add middle ware in storeController.js
    const multer = require('multer');
    const multerOptions ={
        
    }

    Multer adds a body object and a file or files object to the request object. 
    The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

