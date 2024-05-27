import { useState, useEffect } from "react"
import Color from "../Colorific/Models/ColorModel"
import { luminanceToWeight } from "../Colorific/utilities"
import chroma from "chroma-js"

export default function SwatchView(props) {
    const [WCAG, setWCAG] = useState(1)
    const [style, setStyle] = useState(null)
    useEffect(() => {
        qualityControl(props.model)
        const WCAGRatioOnWhite = props.model.color.contrast(new Color("#FFFFFF"), "WCAG21")
        setWCAG(WCAGRatioOnWhite)
        setStyle({
            backgroundColor: props.model.color.as("hex"),
            color: (WCAGRatioOnWhite > 3.0) ? "#FFFFFF" : "#000000",
            fontSize: '12px',
            fontWeight: (WCAGRatioOnWhite >= 3.0 && WCAGRatioOnWhite < 4.5) ? 700 : 400,
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        })
    }, [])

    return (
        <div className="Swatch" style={style}>
            {/* {parseFloat(props.model.color.lab_d65.l).toFixed(2)}   */}
            {WCAG.toFixed(2)}
        </div>
    )
}

function anchorEmoji(priority) {
    if (priority === null || priority < 0) return " "
    if (priority === 0) return "⭐️"
    return "📍"
}

function qualityControl(model) {

    const value = model.color.as("hex")
    const clr = new Color(value)
    const chr = chroma(value)
    if (luminanceToWeight(model.color.lab.l) === "500") {
        const wcagOnWhite = model.color.contrast(new Color("#FFFFFF"), "WCAG21")
        const wcagOnBlack = model.color.contrast(new Color("#000000"), "WCAG21")
        console.log(`${value} -> color-js(L* ${clr.lab_d65.l.toFixed(2)}) / chroma-js(L* ${chr.get('lab.l').toFixed(2)}) *** ${wcagOnWhite.toFixed(2)}/${wcagOnBlack.toFixed(2)}`)
    }

}
