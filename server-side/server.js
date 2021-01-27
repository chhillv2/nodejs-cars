const calculation = require('./calculations.js')
const express = require('express')
const app = express()
const port = 3000

var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send("Available routes ==> /averageListingprice, /distributionMake, /mostContactedlisting, /topfivepermonth")
})

app.get('/averageListingprice', (req, res) => {
    calculation.averageListingprice()
    res.send("Result is in console server")
})

app.get('/distributionMake', (req, res) => {
    calculation.distributionMake()
    res.send("Result is in console server")
})

app.get('/mostContactedlisting', (req, res) => {
    calculation.mostContactedlisting()
    res.send("Result is in console server")
})

app.get('/topfivepermonth', (req, res) => {
    calculation.topfivepermonth()
    res.send("Result is in console server")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})