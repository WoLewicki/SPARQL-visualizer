import React from 'react';
import './App.css';
import Globe from 'react-globe.gl';
import {countriesQuery, antoineQuery, booksQuery, maxBillQuery, airAccidentsQuery} from './utils/queries';
import {execute} from './utils/queryParser';
import {StyledSlider, Thumb, Track} from './slider';

import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'
import injectFonts from 'typography-inject-fonts'

const typography = new Typography(funstonTheme)
typography.injectStyles()
injectFonts(typography)

function App() {
  const [globeLabels, setGlobeLabels] = React.useState([]);
  const [currentQuery, setCurrentQuery] = React.useState('');
  const [counter_booksQuery, setCounter_booksQuery] = React.useState(1000);
  const [counter_maxBillQuery, setCounter_maxBillQuery] = React.useState(1000);

  return (
    <div className="App">
      <header className="App-header">
        <div style={styles.splitScreen}>
          <div style={styles.leftPane}>
            <p>{currentQuery}</p>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, countriesQuery)} block>Show populations of the World</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, antoineQuery)} block>Show birthplace of people with name Antoine</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, airAccidentsQuery)} block>Show air accidents query</button>
            <br></br>
            <br></br>
            <center>
              Year of books less than:
            <StyledSlider
                min={0}
                max={2021}
                defaultValue={counter_booksQuery}
                renderTrack={Track}
                renderThumb={Thumb}
                onChange={val => setCounter_booksQuery(val)}
                />
            </center>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, booksQuery(counter_booksQuery))} block>Show books query</button>
            <br></br>
            <br></br>
            <center>
              Year of Max Bill's works grater than:
            <StyledSlider
                min={1}
                max={2021}
                defaultValue={counter_maxBillQuery}
                renderTrack={Track}
                renderThumb={Thumb}
                onChange={val => setCounter_maxBillQuery(val)}
            />
            </center>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, maxBillQuery(counter_maxBillQuery))} block>Show max bill query</button>
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
              labelSize={d => Math.sqrt(d.properties.pop_max) * 0.0001}
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
      display: 'flex',
      flexDirection: 'column',
  },
  rightPane: {
      width: '50%',
  },
};

export default App;