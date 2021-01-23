const fs = require('fs')
const chalk = require('chalk')
const csv = require('csv-parser');

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse('Your notes'))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

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

      var objSorted = {}
      sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
      })

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
  let count = 0
  let make = []
  var sortable = [];


  fs.createReadStream('contacts.csv')
    .pipe(csv())
    .on('data', (row) => {
      make.push(row.listing_id)  
    })

    .on('end', () => {
      const formatMake = JSON.parse(make)
      let countedNames = formatMake.reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++
        }
        else {
          allNames[name] = 1
        }
        return allNames
      }, {})

      const sortable = Object.entries(countedNames)
      .sort(([, a], [, b]) => a-b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      for (const [key, value] of Object.entries(sortable)) {
        console.log(`${key}: ${value}`);
      }
      var objSorted = {}

      make.forEach(function(item){
        objSorted[item[0]]=item[1]
    })
      // console.log("sorrttt", make);
  
    });
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  averageListingprice,
  distributionMake,
  mostContactedlisting
}