import React from 'react';
import './App.css';
import Globe from 'react-globe.gl';
import {executeQuery} from './utils/wikidata';

const countriesQuery = 
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

async function execute(setGlobeLabels) {
  const data = await executeQuery(countriesQuery);
  const bindings = data.results.bindings;
  const globeLabels = parseCountriesIntoObjects(bindings);
  setGlobeLabels(globeLabels);
}

function parseCountriesIntoObjects(bindings) {
  const arr = [];
  for (const obj of bindings) {
    const longitude = obj.cords.value.replace( /[^\d\.\ ]*/g, '').split(" ")[0];
    const latitude = obj.cords.value.replace( /[^\d\.\ ]*/g, '').split(" ")[1];
    arr.push({
      properties: {
        longitude,
        latitude,
        name: obj.countryLabel.value,
        pop_max: obj.population.value,
      }
    })
  }
  return arr;
}

function App() {
  const [globeLabels, setGlobeLabels] = React.useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={styles.splitScreen}>
          <div style={styles.leftPane}>
            <button color='primary' onClick={() => execute(setGlobeLabels)} block>Search</button>
          </div>
          <div style={styles.rightPane}>
            <Globe
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              width={1000} height={1000}
              labelsData={globeLabels}
              labelLat={d => d.properties.latitude}
              labelLng={d => d.properties.longitude}
              labelText={d => d.properties.name}
              labelSize={d => Math.sqrt(d.properties.pop_max) * 0.00005}
              labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 0.00005}
              labelColor={() => 'rgba(255, 165, 0, 0.75)'}
              labelResolution={2}
              />
          </div>
        </div>
      </header>
    </div>
  );
}

const styles = {
  splitScreen: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContnent: 'center'
  },
  leftPane: {
      width: '50%',
  },
  rightPane: {
      width: '50%',
  },
};

export default App;
