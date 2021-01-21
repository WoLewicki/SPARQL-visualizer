import React from 'react';

import {Helmet} from "react-helmet";
import Typography from 'typography'
import funstonTheme from 'typography-theme-funston'
import injectFonts from 'typography-inject-fonts'
import Globe from 'react-globe.gl';
import ReactTextCollapse from 'react-text-collapse';

import './App.css';
import {countriesQuery, antoineQuery, booksQuery, maxBillQuery, airAccidentsQuery} from './utils/queries';
import {execute} from './utils/queryParser';
import {StyledSlider, Thumb, Track} from './slider';


const typography = new Typography(funstonTheme)
typography.injectStyles()
injectFonts(typography)

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: '... show query', // text to show when collapsed
  expandText: '... hide query', // text to show when expanded
  minHeight: 50, // component height when closed
  maxHeight: 200, // expanded to
  textStyle: { // pass the css for the collapseText and expandText here
    color: "white",
    fontSize: "20px"
  }
}

function App() {
  const [globeLabels, setGlobeLabels] = React.useState([]);
  const [currentQuery, setCurrentQuery] = React.useState('Click button to see a query.');
  const [booksCounter, setBooksCounter] = React.useState(1000);
  const [billCounter, setBillCounter] = React.useState(1000);

  return (
    <div className="App">
      <header className="App-header">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Sparql Visualizer</title>
        </Helmet>
        <div style={styles.splitScreen}>
          <div style={styles.leftPane}>
        <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
          <p> {currentQuery} </p>
        </ReactTextCollapse>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, countriesQuery)} block>Show populations of the World</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, antoineQuery)} block>Show birthplace of people with name Antoine</button>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, airAccidentsQuery)} block>Show air accidents query</button>
            <br></br>
            <center>
              Year of books less than:
            <StyledSlider
                min={0}
                max={2021}
                defaultValue={booksCounter}
                renderTrack={Track}
                renderThumb={Thumb}
                onChange={val => setBooksCounter(val)}
                />
            </center>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, booksQuery(booksCounter))} block>Show books query</button>
            <br></br>
            <center>
              Year of Max Bill's works grater than:
            <StyledSlider
                min={1}
                max={2021}
                defaultValue={billCounter}
                renderTrack={Track}
                renderThumb={Thumb}
                onChange={val => setBillCounter(val)}
            />
            </center>
            <button color='primary' onClick={() => execute(setGlobeLabels, setCurrentQuery, maxBillQuery(billCounter))} block>Show max bill query</button>
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
