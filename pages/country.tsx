import gql from 'graphql-tag'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useGQLQuery} from './useGQLQuery'
const GET_COUNTRY = gql`
  query($code:ID!) {
    country(code: $code) {
        name
        native
        phone
        capital
        currency
        emoji
    }
  }
`;
const Country = ({code}) => {
    //fetch some data
    const {data, isLoading, error} = useGQLQuery('country', GET_COUNTRY, {code: code});
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Something went wrong!</div>
    return (
        <>
            <Head>
                <title>{data.country.name} details</title>
            </Head>
            <div className={styles.details}>
                <h1>Country Details</h1>
                <p>Country Name:{data.country.name}</p>
                <p>Country Native:{data.country.native}</p>
                <p>Country Phone:+{data.country.phone}</p>
                <p>Country Currency:{data.country.currency}</p>
                <p>Country Emoji:{data.country.emoji}</p>
            </div>
            <Link href="../">
                <button className={styles.button}>Go back</button>
            </Link>
        </>
    )
}


Country.getInitialProps = async ({ query }) => {
    const { code } = query
  
    return {
      code
    }
  
}


export default Country;