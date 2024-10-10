import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/PhoneBook'

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const isExist = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())
    
    if(isExist){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewName('');
      setNewNumber('')
    }
  }

  const showContacts = filter === '' 
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={value => setFilter(value)} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={value => setNewName(value)} handleNumber={value => setNewNumber(value)} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Phonebook contacts={showContacts} />
    </div>
  )
}

export default App