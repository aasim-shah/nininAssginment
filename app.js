const express = require('express')
const app = express()
var axios = require("axios")
var bodyParser = require('body-parser')

const ejs = require('ejs')
const port = process.env.PORT || 5000;





//midlewares 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set("view engine" , "ejs")



app.get("/" , async(req ,res) =>{
    res.render('Homepage'  , {data : null , checkBox : null  , searchTerm : null})

})

app.get("/search" , async(req ,res) =>{
    res.render('Homepage'  , {data : null , checkBox : null , searchTerm : null})

})


app.post('/search' , async(req , res) =>{
try {
    const { searchTerm , checkBox } = req.body;
    console.log(req.body)
    const responseArray = [];
    var options = {
        method : 'GET',
        url: 'https://itunes.apple.com/search',
        params: {term: searchTerm}
      };
      axios.request(options).then(function (response) {
        res.render('Homepage' , {data : response.data , checkBox : checkBox , searchTerm })
      }).catch(function (error) {
        console.error(error);
      });
} catch (error) {
    console.log(error)
}

})



app.listen(port , ()=>{
    console.log(`server is running on port ${port} , http://localhost:${port}`)
})
