import logo from './logo.svg';
import './App.css';
import Color from './Colorific/Models/ColorModel';
import SwatchView from './Views/SwatchView';
import Palette from './Colorific/Models/PaletteModel';
import ColumnView from './Views/ColumnView';
import PaletteView from './Views/PaletteView';

import { hexToDecimal } from './Colorific/utilities';

function App() {

  // const color =  new Color('srgb', hexToDecimal("#8352C6"))
  // const color = new Color('lab', [50, 0, 0])
  // const colo2 = new Color('lab', [75, 0, 0])
  // const color = new Color("okhsl", [276, 0, 1])
  // const column = new Column([color, colo2]);
  // console.log(column.getColors("hex"))
  // console.log(column.values())
  // console.log(column)

  //
  // I need a Controller. 
  //

  	/**
	 * Creates an instance of Color.
	 * Signatures:
	 * - `new Color(stringToParse)`
	 * - `new Color(otherColor)`
	 * - `new Color({space, coords, alpha})`
	 * - `new Color(space, coords, alpha)`
	 * - `new Color(spaceId, coords, alpha)`
	 */

  // const color =  new Color('srgb', hexToDecimal("#8352C6"))
  // const color = new Color("#8352C6") 
  const color = new Color("oklch(41.03% 0.1 117)")
  console.log(color.as("hex")) //8352c6

  const palette = new Palette([
    [new Color("oklch(51.11% 0.1549 228)"), new Color("oklch(70% 0.1549 228)")], 
    [new Color("#8352c6")], 
    [new Color("#7b6747")], 
    [new Color("#007c00")], 
    [new Color("#d80000")], 
    [new Color("#FFCF3D")], 
    [new Color("#F57C13")], 
    [new Color("#035ef9")], 
    [new Color("#0A66D8")], 
    [new Color("#6a6a6a")]
  ])

  console.log(palette.getColors("hex"))

  // SwatchView()

   const a = palette.columns[0].swatches[12]
   console.log("THIS IS A", a)

  // console.log(palette)

  const f = SwatchView(a)

  return (
    <div className="App">
      <PaletteView model={palette}/>
    </div>
  );
}

export default App;
