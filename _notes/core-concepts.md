# Node.js Application core concept
## Routing

### req.query  vs req.params.id
    /api/:name
        req.params.name returns the value of name
    
    /api?name=ben&age=40
        req.query returns a json object  {name:"ben", age:"40"}

## Template
    res.render('<template>', parameter )
    p.hello Hello #{name}
    img.dog(src="dog.jpg" alt=`${dog}`)      # use parameter in attribute

## middle ware
    // routes specific middleware
    exports.myMiddleware = (req, res, next) =>{
        req.name = "wes";
        next();  // important
    }

    router.get("/", myMiddleware, homePage);

    // Global middleware
    app.user( middleware );