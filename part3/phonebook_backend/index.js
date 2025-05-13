require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

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

  Person.find({}).then(people => {
    const info = `
      <p>Phonebook has info for ${people.length} people</p>
      <p>${date}</p>`;

    response.send(info);
  })

});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({ name, number});

  person.save()
    .then(savedPerson => {
      console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`);
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malfomatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json( { error: error.message})
  }

  next(error)
}

app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})