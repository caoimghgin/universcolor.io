
import chroma from 'chroma-js';
import ColorModel from './Colorific/Models/ColorModel';
import PaletteModel from './Colorific/Models/PaletteModel';
import PaletteView from './Views/PaletteView';
import midtones from './Colorific/constants/midtones.js'
import midtones050 from './Colorific/constants/midtones050.js'

function App() {

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
      <PaletteView model={palette}/>
    </div>
  );
}

function generateMidtones() {
  console.log("LENGTH:", midtones.length)

  const max = midtones.reduce(function(prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones.reduce(function(prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones.map(item => item.luminance_d65).reduce((p,c,_,a) => p + c/a.length,0)

  console.log("max", max)
  console.log("min", min)
  console.log("avg", avg)

  return 
  const results = []

  let n = 0;
  while (results.length < 1001) {
    const color = new ColorModel(chroma.random().hex('rgb'))
    if ( (color.lab_d65.l >= 45) && (color.lab_d65.l <= 55)) {
      const hex = color.as("hex")
      const wcagOnWhite = color.contrast(new ColorModel("#FFFFFF"), "WCAG21")
      const wcagOnBlack = color.contrast(new ColorModel("#000000"), "WCAG21")
      if ((wcagOnWhite >= 4.5) && (wcagOnBlack >= 4.5)) {
        results.push({value:hex, luminance_d65: color.lab_d65.l.toFixed(3), wcag_w:wcagOnWhite.toFixed(3), wcag_k: wcagOnBlack.toFixed(3)})
      }

    }
    n++;
  }
  console.log(results)
}

function generateMidtones_550() {

  const max = midtones050.reduce(function(prev, current) {
    return (prev && prev.luminance_d65 > current.luminance_d65) ? prev : current
  })

  const min = midtones050.reduce(function(prev, current) {
    return (prev && prev.luminance_d65 < current.luminance_d65) ? prev : current
  })

  const avg = midtones050.map(item => item.luminance_d65).reduce((p,c,_,a) => p + c/a.length,0)

  console.log("max", max)
  console.log("min", min)
  console.log("avg", avg)
}

export default App;
