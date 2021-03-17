require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fetch = require('node-fetch');


const app = express();

//my routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const weather = require("./models/weather");

//MongoDb connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Database Conected !!`);
  })
  .catch("Db Erros");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Running post
const port = process.env.PORT || 5000;




 fetch('https://api.openweathermap.org/data/2.5/weather?q=Hongkong&APPID=f33a484cf794d08d0148764789aaba32&units=metric')
  .then(res => res.json())
  .then(json => {
    const result = json.weather;
    console.log(json.main.temp);
    result.map(data=>{
      weather.findOne({temp:json.main.temp}, function(err, example){
        if(err) console.log(err);
        if ( example){
        console.log("This has already been saved");
        } else {
          let weatherData = new weather({
                main:data.main,
                description:data.description,
                temp:json.main.temp
            })
            weatherData.save(function(err, example) {
                  if(err) console.log(err);
                  console.log("Saved to database");
              });
          }
    }) 
  })
})

app.get("/api/getweather", (req, res) => {
  weather.find()
  .sort({$natural: -1 }).limit(1)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(data);
    });
 })
//my routes
app.use("/api", authRoute);
app.use("/api", userRoute);

app.listen(port, () => console.log(`App is running at port ${port}`));