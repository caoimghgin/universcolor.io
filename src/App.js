
import { useState, useEffect } from "react"
import ColorModel from './Colorific/Models/ColorModel';
import PaletteModel from './Colorific/Models/PaletteModel';
import PaletteView from './Views/PaletteView';
import midtones from './Colorific/constants/midtones.js'
import midtones050 from './Colorific/constants/midtones050.js'

function App() {

  useEffect(() => {

    document.onkeydown = function (event) {
      if (event.repeat) return;
      if (event.key === "3") { console.log("A") }
      if (event.key === "4") { console.log("B") }
      if (event.key === "7") { console.log("C") }
    };

    document.onkeydown = (event => onKeyDownEventHandler(event));

    return () => {
      document.removeEventListener("onkeydown", onKeyDownEventHandler)
    }


  }, [])

  const palette = new PaletteModel([
    [new ColorModel("oklch(49.25% 0.121 237.21)")],
    [new ColorModel("#8B60CA")],
    [new ColorModel("#7b6747")],
    [new ColorModel("#007c00")],
    [new ColorModel("#d80000")],
    [new ColorModel("#FFCF3D")],
    [new ColorModel("#F57C13")],
    [new ColorModel("#035ef9")],
    [new ColorModel("#0A66D8")],
    [new ColorModel("#6a6a6a")]
  ])

  return (
    <div className="App">
      <PaletteView model={palette} />
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
  if (event.key === "7") { console.log("broadcast out that somebody wants to see 7:1")}

  if (event.key === "Shift") dispatchEvent(new CustomEvent("SHOW_APCA", event));

  


}

export default App;
