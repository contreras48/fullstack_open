require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person =  require('./models/person');

const app = express();

morgan.token('body', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : "";
})

app.use(express.static('dist'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json());

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
});

app.get('/info', (request, response) => {
  const date = new Date();
  
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`;

    response.send(info);
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  
  if (person) {
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
  }else {
    response.status(404).json({
      error: 'person not found'
    });
  } 

})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then( savedPerson => {
    console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`);
     response.json(savedPerson);
  })
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})