import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import ButtonBack from './BackButton'
import Spinner from "./Spinner";

function City() {

  const { id } = useParams()
  const { getCity, currentCity, isLoading } = useCities()

  // const formatDate = (date) =>
  //   new Intl.DateTimeFormat("en", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     weekday: "long",
  //   }).format(new Date(date));

  useEffect(() => {
    console.log("City ID from URL params:", id); // debug
    if (!id) return;
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />
  if (!currentCity || Object.keys(currentCity).length === 0) return <p>City not found</p>


  const { cityName, emoji, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {/* <p>{formatDate(date || null)}</p> */}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;