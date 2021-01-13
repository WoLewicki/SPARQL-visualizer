export const countriesQuery = 
`
SELECT DISTINCT ?countryLabel ?population ?cords
{
  ?country wdt:P31 wd:Q6256 ;
           wdt:P1082 ?population ;
           wdt:P625 ?cords.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
GROUP BY ?population ?countryLabel ?cords
ORDER BY DESC(?population)
`;

export const antoineQuery = 
`
SELECT ?itemLabel ?cords ?placeName
WHERE
{
  ?item wdt:P31 wd:Q5 .   # human
  ?item wdt:P735 wd:Q15235674.
  ?item wdt:P19 ?place.
  ?place wdt:P1448 ?placeName.
  ?place wdt:P625 ?cords.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }
}
`;
