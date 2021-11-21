import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import gql from 'graphql-tag'
import {useGQLQuery} from './useGQLQuery'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;
const Home: NextPage = () => {

  const newLocal = useGQLQuery('countries', GET_COUNTRIES);
  // fetch some data
  const {data, isLoading, error} = newLocal;
  const [value, setValue] = useState('AD');
  const router = useRouter();
  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Something went wrong!</div>
  else {
    const handleClick = (e:any): void => {
      e.preventDefault();
      router.push(`/country?code=${value}`, `/country/${value}`);
    }
    return (
      <div>
        <Head>
          <title>Task</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.select}>
          <h1>Know more about any country now!</h1>
          <select
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
            {data.countries.map((country:any): JSX.Element => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))}
          </select>
          <button className={styles.button} onClick={handleClick}>Go</button>
        </div>
      </div>
    )
  }

}

export default Home
