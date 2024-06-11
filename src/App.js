import { useState, useEffect } from "react"
import ColorModel from './Univers/Models/ColorModel.js';
import PaletteModel from './Univers/Models/PaletteModel.js';
import PaletteView from './Views/PaletteView';
import Select from 'react-select'
import midtones from './Univers/constants/midtones.js'
import midtones050 from './Univers/constants/midtones050.js'

const contrastAlgorithmOptions = [
  { value: 'wcag21', label: 'WCAG21' },
  { value: 'apca', label: 'APCA' },
];

const swatchDisplayOptions = [
  { value: 'none', label: 'NONE' },
  { value: 'wcag21', label: 'WCAG21' },
  { value: 'ciel*d65', label: 'CIE L* (d65)' },
  { value: 'apcalc_white', label: 'APCA Lc (white)' },
  { value: 'apcalc_black', label: 'APCA Lc (black)' },
];

function App() {
  const [selectedContrastOption, setSelectedConstrastOption] = useState(contrastAlgorithmOptions[0]);
  const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[2]);

  useEffect(() => {
    document.onkeydown = (event => onKeyDownEventHandler(event));
    return () => document.removeEventListener("onkeydown", onKeyDownEventHandler)
  }, [])

  useEffect(() => {
    dispatchEvent(new CustomEvent("selectedContrastOptionEvent", { detail: selectedContrastOption }));
  }, [selectedContrastOption])

  useEffect(() => {
    dispatchEvent(new CustomEvent("selectedSwatchDisplayOptionEvent", { detail: selectedSwatchDisplayOption }));
  }, [selectedSwatchDisplayOption])

  const onSelectConstrastChangeHandler = (event) => {
    console.log(event)
    setSelectedConstrastOption(event)
  }

  const onSelectSwatchDisplayChangeHandler = (event) => {
    console.log(event)
    setSelectedSwatchDisplayOption(event)

  }

  const palette_og = new PaletteModel([
    { semantic: "primary", values: [new ColorModel("oklch(49.25% 0.121 237.21)")] },
    { semantic: "primary", values: [new ColorModel("lch(59.46% 86.13 59.27)")] },
    { semantic: "primary", values: [new ColorModel("#7b6747"), new ColorModel("oklab(35.512% 0.00687 0.03516)")] },
    { semantic: "primary", values: [new ColorModel("#007c00")] },
    { semantic: "primary", values: [new ColorModel("#d80000")] },
    { semantic: "primary", values: [new ColorModel("#FFCF3D")] },
    { semantic: "primary", values: [new ColorModel("#FD6905")] },
    { semantic: "primary", values: [new ColorModel("#035ef9")] },
    { semantic: "primary", values: [new ColorModel("#0A66D8")] },
    { semantic: "primary", values: [new ColorModel("#7F7F7F")] },
  ])

  const palette_a = [
    { semantic: "primary", values: ["#6A6A6A"] },
    { semantic: "secondary", values: ["#6A6A6A"] },
    { semantic: "tertiary", values: ["#6A6A6A"] },
    { semantic: "positive", values: ["#6A6A6A"] },
    { semantic: "negative",values: ["#6A6A6A"] },
    { semantic: "highlight", values: ["#6A6A6A"] },
    { semantic: "attention", values: ["#6A6A6A"] },
    { semantic: "info", values: ["#6A6A6A"] },
    { semantic: "system", values: ["#6A6A6A"] },
    { semantic: "neutral", values: ["#6A6A6A"] },

  ]

  // Note that primary takes an oklch definition in CSS Color and spreads to white/black on the primary row/colum.
  // And how secondary takes an lch definition and spreads to white/black.
  // Further note that tertiary takes a hex and an oklab and spreads. Because the first item in the array is a hex, it renders in hex despite the second object being oklab
  
  const palette_b = [
    { semantic: "primary", values: ["oklch(49.25% 0.121 237.21)"] },
    { semantic: "secondary", values: ["lch(59.46% 86.13 59.27)"] },
    { semantic: "tertiary", values: ["#7b6747", "oklab(35.512% 0.00687 0.03516)"] },
    { semantic: "positive", values: ["#007c00"] },
    { semantic: "negative", values: ["#d80000"] },
    { semantic: "highlight", values: ["#FFCF3D"] },
    { semantic: "attention", values: ["#FD6905"] },
    { semantic: "info", values: ["#035ef9"] },
    { semantic: "system", values: ["#0A66D8"] },
    { semantic: "neutral", values: ["#7F7F7F"] },
  ]

  return (
    <div className="App">
      <PaletteView model={new PaletteModel(palette_b)} />
      <Select defaultValue={selectedContrastOption} onChange={onSelectConstrastChangeHandler} options={contrastAlgorithmOptions} />
      <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
    </div>
  );
}

function generateMidtones() {
  console.log("LENGTH:", midtones.length)

  const max = midtones.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones.map(item => item.luminance_d65).reduce((p, c, _, a) => p + c / a.length, 0)

  console.log("max", max)
  console.log("min", min)
  console.log("avg", avg)

}

function generateMidtones_550() {

  const max = midtones050.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones050.reduce(function (prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones050.map(item => item.luminance_d65).reduce((p, c, _, a) => p + c / a.length, 0)

  console.log("max", max)
  console.log("min", min)
  console.log("avg", avg)
}

const onKeyDownEventHandler = (event) => {
  console.log("onKeyDownEventHandler", event)
  if (event.repeat) return;
  if (event.key === "3") { console.log("broadcast out that somebody wants to see 3:1") }
  if (event.key === "4") { console.log("broadcast out that somebody wants to see 4.5:1") }
  if (event.key === "7") { console.log("broadcast out that somebody wants to see 7:1") }

  if (event.key === "Shift") dispatchEvent(new CustomEvent("SHOW_APCA", event));

}

export default App;
