const PersonForm = ({ name, number, handleName, handleNumber, handleSubmit }) => {
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div>
        name: <input value={name} onChange={event => handleName(event.target.value)} />
      </div>
      <div>
        number: <input value={number} onChange={event => handleNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;