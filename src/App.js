import { useState, useEffect } from "react"

import PaletteModel from './Univers/Models/PaletteModel.js';
import PaletteView from './Views/PaletteView';
import midtones from './Univers/constants/midtones.js'
import midtones050 from './Univers/constants/midtones050.js'
import SideNav from "./Views/SideNav.js";

const swatchDisplayOptions = [
  { value: 'none', label: 'NONE' },
  { value: 'ciel*d65', label: 'CIE L* (d65)' },
  { value: 'apcalc_white', label: 'APCA' },
  { value: 'wcag21', label: 'WCAG21' },
];

const defaultParameters = () => {
  const params = {}
  params.primary = "oklch(49.25% 0.121 237.21)"
  params.secondary = "lch(59.46% 86.13 59.27)"
  params.tertiary = "#7b6747, oklab(35.512% 0.00687 0.03516)"
  params.positive = "#007c00"
  params.negative = "#d80000"
  params.highlight = "#FFCF3D"
  params.attention = "#FD6905"
  params.info = "#035ef9"
  params.system = "#0A66D8"
  params.neutral = "#7F7F7F"
  return params
}

function App() {

  const [appDelegate, setAppDelegate] = useState({ displayContrast: "wcag21", displayValue: "ciel*d65" });
  const [data, setData] = useState(null);

  useEffect(() => {

    setData([
      { index: 0, semantic: "primary", values: ["oklch(49.25% 0.121 237.21)"] },
      { index: 1, semantic: "secondary", values: ["#7b6747", "oklab(35.512% 0.00687 0.03516)"] },
      { index: 2, semantic: "positive", values: ["#007c00"] },
      { index: 3, semantic: "negative", values: ["#d80000"] },
      { index: 4, semantic: "highlight", values: ["#ffc107"] },
      { index: 5, semantic: "attention", values: ["#F26722"] },
      { index: 6, semantic: "info", values: ["#035ef9"] },
      { index: 7, semantic: "neutral", values: null },
      { index: 8, semantic: "system info", values: ["#0A66D8"] },
      { index: 9, semantic: "system neutral", values: null },
    ])

    // setTimeout(function () {
    //   const xxx = searchParams.get("www")
    //   console.log("xxx", xxx)
    //   // const xxx = data
    //   // data[0] = { index: 0, semantic: "primary", values: ["#7F7F7F"] }
    //   // setData(xxx)
    // }, 2000);

    window.addEventListener('UPDATE_DISPLAY_VALUES', foo);
    document.onkeydown = (event => onKeyDownEventHandler(event));
    return () => document.removeEventListener("onkeydown", onKeyDownEventHandler)

  }, [])

  async function foo(event) {
    console.log("I CAUGHT AN EVENT...", event)
    await new Promise(r => setTimeout(r, 100));
    setAppDelegate({ ...appDelegate, displayValue: event.detail })
    // props.setDelegate({ ...props.delegate, displayValue: event.value })
  }

  return (
    <div className="App" style={style}>
      <SideNav setDelegate={setAppDelegate} delegate={appDelegate} />
      <PaletteView model={new PaletteModel(data)} delegate={appDelegate} />
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
  if (event.key === "x") dispatchEvent(new CustomEvent("EXPORT_DATA", event))
}

const style = {
  display: "flex",
  height: "100vh"
}

export default App;
