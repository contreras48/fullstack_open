const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url =
  `mongodb+srv://fullstack:${password}@cluster0.rtrpicf.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const create = (name, number) => {
  console.log(name,number)
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

const find = () => Person.find({}).then(people => {
  console.log('phonebook:')
  people.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})

if (process.argv.length === 3) {
  find();
} else {
  create(process.argv[3], process.argv[4]);
}