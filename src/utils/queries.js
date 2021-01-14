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
LIMIT 250`;

export const booksQuery =
    `
SELECT ?label ?cords
WHERE
{
  VALUES ?type {wd:Q571 wd:Q7725634}  # book or literary work
  ?item wdt:P31 ?type .
  ?item wdt:P577 ?date FILTER (?date < "1830-01-01T00:00:00Z"^^xsd:dateTime) . # the date which user may manipulate 
  ?item rdfs:label ?label filter (lang(?label) = "en")

  OPTIONAL {
    ?item (wdt:P291|wdt:P840) ?place .  # publication or narration place is ?place
    ?place wdt:P625 ?cords
  }
}
LIMIT 250`;


export const maxBillQuery =
    `
SELECT DISTINCT ?itemLabel ?countryLabel ?placeLabel (YEAR(?date) as ?year) ?cords
WHERE
{
  ?item wdt:P31/wdt:P279* wd:Q860861 .
  ?item wdt:P170 wd:Q123454 .
  OPTIONAL { ?item wdt:P17 ?country . }
  OPTIONAL { ?item wdt:P131 ?place . }
  ?item wdt:P571 ?date FILTER (?date > "1986-01-01T00:00:00Z"^^xsd:dateTime) . # the date which user may manipulate 
  OPTIONAL { ?item wdt:P625 ?cords . }
  OPTIONAL { ?item wdt:P18 ?image . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}
ORDER BY ?itemLabel ?placeLabel
`;

export const airAccidentsQuery =
    `
SELECT ?label ?cords ?place
WHERE
{
   ?subj wdt:P31 wd:Q744913  .
   ?subj wdt:P625 ?cords .
   ?subj rdfs:label ?label filter (lang(?label) = "en")
}
LIMIT 250`
