import {executeQuery} from './wikidata';

export async function execute(setGlobeLabels, query) {
  const data = await executeQuery(query);
  const bindings = data.results.bindings;
  const globeLabels = parseCountriesIntoObjects(bindings);
  console.warn(globeLabels);
  setGlobeLabels(globeLabels);
}

function parseCountriesIntoObjects(bindings) {
  const arr = [];
  for (const obj of bindings) {
    const longitude = obj?.cords?.value?.replace( /[^\d. -]*/g, '').split(" ")[0];
    const latitude = obj?.cords?.value?.replace( /[^\d. -]*/g, '').split(" ")[1];
    arr.push({
      properties: {
        longitude,
        latitude,
        name: obj?.countryLabel?.value  || obj?.label?.value || `${obj?.itemLabel?.value} - ${obj?.placeName?.value || obj?.placeLabel?.value}`,
        pop_max: obj?.population?.value || 100000,
      }
    })
  }
  return arr;
}
