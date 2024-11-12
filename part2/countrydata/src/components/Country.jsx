const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km<sup>2</sup></div>
      <p><strong>Languages:</strong></p>
      <ul>
        {
          Object.entries(country.languages).map(([code, name]) => <li key={code}>{name}</li>)
        }
      </ul>
      <img height={200} width={300} src={country.flags.svg} alt={country.flags.alt} />
    </div>
  )

}


export default Country;