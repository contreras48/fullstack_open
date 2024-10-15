import Person from './Person'

const Phonebook = ({ contacts, handleDelete }) => {
  return (
    <div>
      { contacts.map(c => <Person key={c.name} person={c} handleDelete={() => handleDelete(c.id)}/>) }
    </div>
  )
}

export default Phonebook;