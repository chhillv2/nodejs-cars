const fs = require('fs')
const csv = require('csv-parser');

const averageListingprice = () => {
  let dealerCount = 0
  let dealerPrice = 0

  let privateCount = 0
  let privatePrice = 0

  let otherCount = 0
  let otherPrice = 0

  fs.createReadStream('listings.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.seller_type === "dealer") {
        dealerCount += 1
        dealerPrice += parseInt(row.price, 10);
      } else if (row.seller_type === "private") {
        privateCount += 1
        privatePrice += parseInt(row.price, 10);
      } else {
        otherCount += 1
        otherPrice += parseInt(row.price, 10);
      }
    })
    .on('end', () => {
      console.log('Average listing seller price for Dealer', '€', (dealerPrice / dealerCount).toFixed(2));
      console.log('Average listing seller price for Private', '€', (privatePrice / privateCount).toFixed(2));
      console.log('Average listing seller price for Other', '€', (otherPrice / otherCount).toFixed(2));
    });
}

const distributionMake = () => {
  let count = 0
  let make = []

  fs.createReadStream('listings.csv')
    .pipe(csv())
    .on('data', (row) => {
      make.push(row.make)
      count += 1
    })
    .on('end', () => {
      let countedNames = make.reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++
        }
        else {
          allNames[name] = 1
        }
        return allNames
      }, {})

      const sortable = Object.entries(countedNames)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      console.log(countedNames);

      for (const [key, value] of Object.entries(sortable)) {
        console.log(`${key}: ${((value / count) * 100).toFixed(2)} %`);
      }
    });
}

const mostContactedlisting = () => {
  let make = []

  fs.createReadStream('contacts.csv')
    .pipe(csv())
    .on('data', (row) => {
      make.push(JSON.stringify(row.listing_id))
    })

    .on('end', () => {
      let countedNames = make.reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++
        }
        else {
          allNames[name] = 1
        }
        return allNames
      }, {})

      const sortable = Object.entries(countedNames)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      const lengthSortable = 0.3 * Object.keys(sortable).length;

      let thirtyPercent = []
      Object.keys(sortable).forEach((k, i) => {
        if (i >= 0 && i < lengthSortable) {
          thirtyPercent.push(JSON.parse(k))
        }
      });

      totalPrice = 0
      totalEntries = 0
      data = []

      fs.createReadStream('listings.csv')
        .pipe(csv())

        .on('data', (row) => {

          Object.keys(thirtyPercent).forEach(function (key) {
            if (thirtyPercent[key] === row.id) {
              data.push(row.price)
              totalEntries += 1
            }
          });

        })
        .on('end', () => {
          let sum = 0
          for (let i = 0; i <= data.length; i++) {
            sum += parseInt(data, 10);
          }
          console.log("data", sum / totalEntries, typeof sum);
        });
    });
}


const topfivepermonth = () => {
  let data = []
  let obj = {}

  var dict = []; // create an empty array

  fs.createReadStream('contacts.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(new Date(parseInt(row.contact_date, 10)).getMonth())
      dict.push({
        key: new Date(parseInt(row.contact_date, 10)).getMonth(),
        value: row.listing_id
      });
    })
    .on('end', () => {
      // console.log('data', dict);

      var output = [];

      dict.forEach(function (item) {
        var existing = output.filter(function (v, i) {
          return v.key == item.key;
        });
        if (existing.length) {
          var existingIndex = output.indexOf(existing[0]);
          output[existingIndex].value = output[existingIndex].value.concat(item.value);
        } else {
          if (typeof item.value == 'string')
            item.value = [item.value];
          output.push(item);
        }
      });

      console.log(output);
      
    });
}

module.exports = {
  averageListingprice,
  distributionMake,
  mostContactedlisting,
  topfivepermonth
}
