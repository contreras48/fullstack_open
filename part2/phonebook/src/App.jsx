import { useState, useEffect } from 'react'
import axios from 'axios';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/PhoneBook'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);

  const addContact = (event) => {
    event.preventDefault();

    const isExist = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())

    if (isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newContact = { name: newName, number: newNumber };

      axios
        .post('http://localhost:3001/persons', newContact)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('')
        });
    }
  }

  const showContacts = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={value => setFilter(value)} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={value => setNewName(value)} handleNumber={value => setNewNumber(value)} handleSubmit={addContact} />
      <h2>Numbers</h2>
      <Phonebook contacts={showContacts} />
    </div>
  )
}

export default App