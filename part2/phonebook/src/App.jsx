import { useState, useEffect } from 'react'
import constactService from './services/contacts';

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
      const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const contact = persons.find(p => p.name.toLowerCase() === newName)
        const changeContact = {
          ...contact,
          number: newNumber
        }
        constactService
          .update(changeContact, contact.id)
          .then(response => {
            setPersons(persons.map(p => p.id === response.id ? response : p))
          })
      }
    } else {
      const contact = { name: newName, number: newNumber };
      constactService
        .create(contact)
        .then(response => {
          setPersons(persons.concat(response));
        });
    }

    setNewName('');
    setNewNumber('')
  }

  const deleteContact = id => {
    const person = persons.find(p => p.id === id);
    if(confirm(`Delete ${person.name} ?`)){
      constactService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          alert(`${response.name} has been successfully eliminated`)
        })
    }
  }

  const showContacts = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))

  useEffect(() => {
    constactService
      .getAll()
      .then(response => {
        setPersons(response);
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={value => setFilter(value)} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={value => setNewName(value)} handleNumber={value => setNewNumber(value)} handleSubmit={addContact} />
      <h2>Numbers</h2>
      <Phonebook contacts={showContacts} handleDelete={deleteContact}/>
    </div>
  )
}

export default App