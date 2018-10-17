const express=require("express");
const request=require("request");
// const cheerio = require('cheerio');
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
var readline = require('readline-sync');
var $ = require('jQuery');
const app=express();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

require("./models/treatment");

mongoose.connect("mongodb://aarshic:qwerty0@ds243041.mlab.com:43041/medic", {
    useNewUrlParser: true
  }).then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// const treatmentRouter=require("./routes/treatment");

const router=express.Router();
// const Treatment=mongoose.model("Treatment");
  

// router.post("/",async function(req,res){
    request.get('https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhcnNoaS4xOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMzk3OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMC0wOSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTM5Nzg2ODM2LCJuYmYiOjE1Mzk3Nzk2MzZ9.NHCV2QcRp4bk_z2m1EykI5YmCn2Qc5PxMXPTzJrc2us&format=json&language=en-gb'
    ,(err, res, data)=>{
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++){
            console.log(obj[i].Name);
        }
        var idsym = "";
        var condition = readline.question("What is your symptom: ");
        for (var i = 0; i < obj.length; i++){
            // console.log(i);
            if (obj[i].Name.toLowerCase() == condition.toLowerCase()){
                console.log(obj[i].ID);
                idsym = obj[i].ID;
            }
        }

        var gender = readline.question("Gender: ");
        var age = readline.question("Age: ");

        request.get('https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=['+idsym+']&gender='+gender+'&year_of_birth='+age+'&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFhcnNoaS4xOTk4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMzk3OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMC0wOSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTM5Nzg2ODcwLCJuYmYiOjE1Mzk3Nzk2NzB9.D3kIQyr-d3_uPbhkhUO7XC3e3AiRPDcpmWU711M0WqU&format=json&language=en-gb'
        ,(err, res, data)=>{
            var obj = JSON.parse(data);
            for (var i = 0; i < obj.length; i++){
                console.log(obj[i].Issue.Name);
            }
            
            var condition = readline.question("What is your condition: ");
            console.log("Your condition is: " + condition);

            var x = condition.toString().replace(/\s+/g, '-').toLowerCase();
            request.get('https://www.apollohospitals.com/patient-care/health-and-lifestyle/diseases-and-conditions/' + x
            ,(err, res, data)=>{
                console.log(data);  
                var jsdom = require("jsdom");
                var JSDOM = jsdom.JSDOM;
                global.document = new JSDOM(data).window.document;
                var ch = global.document.getElementsByTagName("h3").innerText;
                
                
                // $('h3.section_header').each(function(index, element) {
                //     var $element = $(element);
                //     if ($element.text().match(/Treatment/i)) {
                //         console.log($('#result').html($element.next('Diagnosis').find('h3.heading3')));
                //     }
                // });
                
                // var doc = d3.select(window.document).tag('h3');
                console.log(ch);
                // ch.array.forEach(element => {
                    
                // });  
                // var ch = cheerio.load(html); 
                // console.log(ch);


                // const titles = $(".item-page");
                // for(var i = 0; i < titles.length; i++){
                //     const title = $(titles[i]).text();
                //     var query = 'INSERT INTO crawling (title) VALUES ("' + title + '")';
                //     connection.query(query, function(err, rows) {
                //     console.log(err);
                //     });
                // }

            });
        });
    });
    

// module.exports=router;

app.use(bodyParser.json());

// app.use("/api/data", treatmentRouter);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const PORT= 5000;

app.listen(PORT,()=>{console.log("Server started successfully")});