import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from './Message'
import styles from './Countrylist.module.css'
import { useCities } from '../contexts/CitiesContext'

function Countrylist() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />
  if (!cities.length) return (<Message message="Add your first city by clicking city on the map" />)

  const countries = cities.reduce((arr, city) => {
    console.log(arr)
    if (!city || !city.country) return arr;

    const exists = arr.some(el => el.country === city.country)
    if (!exists) {
      arr.push({ country: city.country, emoji: city.emoji });
    }
    return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country.country} />)}
    </ul>
  )
}

export default Countrylist
