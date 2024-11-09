

const ListCountries = ({ countries, onClick }) => {

  const list = <ul>
    {countries.map(c => {
      return <li key={c.cca2}>
        {c.name.common}
        <button onClick={() => onClick(c)}>show</button>
      </li>
    })}
  </ul>

  return (
    <div>
      {countries.length === 0 && null}
      {(countries.length > 1 && countries.length <= 10) && list}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
    </div>
  );
}

export default ListCountries