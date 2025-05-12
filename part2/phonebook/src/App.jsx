import { useState, useEffect } from 'react'
import constactService from './services/contacts';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/PhoneBook'
import Notification from './components/Notification'; 
import './index.css';

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);

  const addContact = (event) => {
    event.preventDefault();

    const isExist = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())

    if (isExist) {
      const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const contact = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const changeContact = {
          ...contact,
          number: newNumber
        }
        constactService
          .update(changeContact, contact.id)
          .then(response => {
            setPersons(persons.map(p => p.id === response.id ? response : p))
            setNotification({message: 'Number changed', success:true});
          })
          .catch(error => {
            setNotification({message: `Information of ${contact.name} has already been remoed form server`, success: false})
            setPersons(persons.filter(p => p.id != contact.id))
          })
      }
    } else {
      const contact = { name: newName, number: newNumber };
      constactService
        .create(contact)
        .then(response => {
          setPersons(persons.concat(response));
          setNotification({message: `Added ${response.name}`, success: true});
        });
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000);

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
          alert(`${person.name} has been successfully eliminated`)
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
      <Notification notification={notification} />
      <Filter filter={filter} handleFilter={value => setFilter(value)} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={value => setNewName(value)} handleNumber={value => setNewNumber(value)} handleSubmit={addContact} />
      <h2>Numbers</h2>
      <Phonebook contacts={showContacts} handleDelete={deleteContact}/>
    </div>
  )
}

export default App