import { useState, useEffect } from "react"
import Color from "../Colorific/Models/ColorModel"
import { luminanceToWeight } from "../Colorific/utilities"

export default function SwatchView(props) {

    const [backgroundColor, setBackgroundColor] = useState(null)
    const [color, setColor] = useState(null)
    const [WCAG, setWCAG] = useState(1)

    useEffect(() => {
        setBackgroundColor(props.model.color.as("hex"))

        const alskdjflaskdjf = new Color(props.model.color.as("hex"))



        setWCAG(alskdjflaskdjf.contrast(new Color("#FFFFFF"), "WCAG21"))
        setColor(props.model.color.contrast(new Color("#FFFFFF"), "WCAG21") > 4.5 ? "#FFFFFF" : "#000000")
        //
        // We live in a society...
        // Let's test the 500 weight. It should always pass WCAG21 on White and on Black.

        //get the weight
        if (luminanceToWeight(props.model.color.lab.l) === "500") {

            // console.log("AS HEX",alskdjflaskdjf)
            // console.log("AS L*",alskdjflaskdjf.lab.l)

            const wcagOnWhite = props.model.color.contrast(new Color("#FFFFFF"), "WCAG21")
            const wcagOnBlack = props.model.color.contrast(new Color("#000000"), "WCAG21")
            // console.log(`${wcagOnWhite}/${wcagOnBlack}`)
            console.log(`--> ${props.model.color.lab.l.toFixed(2)}/${alskdjflaskdjf.lab.l.toFixed(2)}`)
        }


    }, [])

    return (
        <div className="Swatch" style={{ backgroundColor: backgroundColor, color: color, width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {parseFloat(props.model.color.lab.l).toFixed(2)}  
            {/* {WCAG.toFixed(2)} */}
        </div>
    )
}

//{anchorEmoji(props.model.priority)}

function anchorEmoji(priority) {
    if (priority === null || priority < 0) return " "
    if (priority === 0) return "⭐️"
    return "📍"
}
