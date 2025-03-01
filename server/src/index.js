const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies",async (req, res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=d9f5198703c246a5a82f0d74759de291";

    try{
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;
    
        return res.json(nameData);
    }

    catch(err){
        console.log(err);
    }
})

//get the target amount
app.get("/convert", async (req, res)=>{
    const{date,sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query;

    try{
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=d9f5198703c246a5a82f0d74759de291`;

        const dataResponse = await axios.get(dataUrl);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target value
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
        return res.json(targetAmount.toFixed(2));
    }

    catch(err){
        console.log(err);
    }
})

//listen to a port
app.listen(5000, ()=>{
    console.log("SERVER STARTED");
})