const yargs = require('yargs')
const calculation = require('./calculations.js')

// Customize yargs version
yargs.version('1.1.0')

yargs.command({
    command: 'averageListing',
    describe: 'average listing price per seller type',
    handler() {
        calculation.averageListingprice()
    }
})

yargs.command({
    command: 'distribution',
    describe: 'Percentual distribution of available cars by make',
    handler() {
        calculation.distributionMake()
    }
})

yargs.command({
    command: 'averageprice',
    describe: 'Average price of the 30 % most contacted listing',
    handler() {
        calculation.mostContactedlisting()
    }
})

yargs.command({
    command: 'topfivepermonth',
    describe: 'Top 5 contacted listing per month',
    handler() {
        calculation.topfivepermonth()
    }
})
yargs.parse()