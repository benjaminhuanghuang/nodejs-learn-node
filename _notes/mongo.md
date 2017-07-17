# Mongo database
## Using mLab


## Using mongo locally
    $ brew update
    $ brew install mongodb
    $ mongo --version
    $ mongod -dbpath /data/prd-latest/


## Mongo GUI tool
    MongoDB Compass


## Connect to DB
    mongoose.connect(process.env.DATABASE);
    mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
    mongoose.connection.on('error', (err) => {
        console.error(`Can not connect to db with error: ${err.message}`);
    });

## Data Model
    // import all of the models in start.js
    require('./models/Store');

## Virtual attribute/fields
    The virtual field is not saved in database.
    userSchema.virtual('gravatar').get(function () {
        const hash = md5(this.email);
        return `http://gravatar.com/avatar/${hash}?200`;
    });


## Pre save hook


## Using aggregate
    storeSchema.statics.getTopStores 
    
## Data relation
    User<->Store<->Review

    virtual field

    populate

    autopopulate  (review.js)

## Index
