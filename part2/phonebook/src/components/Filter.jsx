const Filter = ({ filter, handleFilter}) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={event => handleFilter(event.target.value)} />
    </div>
  )
}

export default Filter;