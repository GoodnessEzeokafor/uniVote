const express = require("express")
const cors = require("cors")
const axios = require('axios')
const path = require("path")

const app = express()
app.use(cors({
    origin:['http://localhost:3000','http://127.0.0.1:3000'],
    credentials:true
}));


app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    
    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "client","build", "index.html"))
    })
}

const PORT =process.env.PORT || 4000
app.listen(PORT, () =>console.log(`Listening ON PORT ${PORT}`))
// --disable-features=CrossSiteDocumentBlockingAlways,CrossSiteDocumentBlockingIfIsolating
