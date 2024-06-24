import { useState, useEffect } from "react"
import PaletteModel from './Univers/Models/PaletteModel.js';
import PaletteView from './Views/PaletteView';
import Select from 'react-select'
import midtones from './Univers/constants/midtones.js'
import midtones050 from './Univers/constants/midtones050.js'

const swatchDisplayOptions = [
  { value: 'none', label: 'NONE' },
  { value: 'ciel*d65', label: 'CIE L* (d65)' },
  { value: 'apcalc_white', label: 'APCA' },
  { value: 'wcag21', label: 'WCAG21' },
];

function App() {
  const [appDelegate, setAppDelegate] = useState({ displayContrast: "wcag21", displayValue: "ciel*d65" });
  const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);
  const [data, setData] = useState(null);

  useEffect(() => {

    setData([
      { index: 0, semantic: "primary", values: ["oklch(49.25% 0.121 237.21)"] },
      { index: 1, semantic: "secondary", values: ["lch(59.46% 86.13 59.27)"] },
      { index: 2, semantic: "tertiary", values: ["#7b6747", "oklab(35.512% 0.00687 0.03516)"] },
      { index: 3, semantic: "positive", values: ["#007c00"] },
      { index: 4, semantic: "negative", values: ["#d80000"] },
      { index: 5, semantic: "highlight", values: ["#FFCF3D"] },
      { index: 6, semantic: "attention", values: ["#FD6905"] },
      { index: 7, semantic: "info", values: ["#035ef9"] },
      { index: 8, semantic: "system", values: ["#0A66D8"] },
      { index: 9, semantic: "neutral", values: ["#7F7F7F"] },
    ])

    document.onkeydown = (event => onKeyDownEventHandler(event));
    return () => document.removeEventListener("onkeydown", onKeyDownEventHandler)

  }, [])

  const onSelectSwatchDisplayChangeHandler = (event) => {
    setSelectedSwatchDisplayOption(event)
    setAppDelegate({ ...appDelegate, displayValue: event.value });
  }

  return (
    <div className="App">
      <PaletteView model={new PaletteModel(data)} delegate={appDelegate} />
      {/* <Select defaultValue={selectedContrastOption} onChange={onSelectConstrastChangeHandler} options={contrastAlgorithmOptions} /> */}
      <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
    </div>
  );
}

function generateMidtones() {

  const max = midtones.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones.map(item => item.luminance_d65).reduce((p, c, _, a) => p + c / a.length, 0)


}

function generateMidtones_550() {

  const max = midtones050.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones050.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones050.map(item => item.luminance_d65).reduce((p, c, _, a) => p + c / a.length, 0)

}

const onKeyDownEventHandler = (event) => {
  if (event.repeat) return;
  if (event.key === "3") { console.log("broadcast out that somebody wants to see 3:1") }
  if (event.key === "4") { console.log("broadcast out that somebody wants to see 4.5:1") }
  if (event.key === "7") { console.log("broadcast out that somebody wants to see 7:1") }

  if (event.key === "Shift") dispatchEvent(new CustomEvent("SHOW_APCA", event));

}

export default App;
