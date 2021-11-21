import {useQuery} from 'react-query'
import {request} from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types';

export const useGQLQuery = (key: string, query: RequestDocument, variables: { code: any; } | undefined, config = {}) => {
    const endpoint = 'https://countries.trevorblades.com/';

    const fetchData = async () => await request(endpoint, query, variables);

    return useQuery(key, fetchData, config);
}