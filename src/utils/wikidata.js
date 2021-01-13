import axios from 'axios';
import WBK from 'wikibase-sdk';

const wdk = WBK({
    instance: 'https://www.wikidata.org',
    sparqlEndpoint: 'https://query.wikidata.org/sparql',
});

export const searchEntities = async (search, language) => {
    const url = wdk.searchEntities({ search, language });
    const result = await axios.get(url);
    return result.data.search;
};

export const executeQuery = async (query) => {
    const [url, body] = wdk.sparqlQuery(query).split('?');
    const result = await axios.post(url, body);
    return result.data;
};
