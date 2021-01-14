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
  const [counter, setCounter] = React.useState(50);

  return (
    <div className="App">
      <header className="App-header">
        <div style={styles.splitScreen}>
          <div style={styles.leftPane}>
            <p>{currentQuery}</p>
            <StyledSlider
                defaultValue={counter}
                renderTrack={Track}
                renderThumb={Thumb}
                onChange={val => setCounter(val)}
            />
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, countriesQuery)} block>Show populations of the World</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, antoineQuery)} block>Show birthplace of people with name Antoine</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, booksQuery)} block>Show books query</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, maxBillQuery)} block>Show max bill query</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, airAccidentsQuery)} block>Show air accidents query</button>
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
