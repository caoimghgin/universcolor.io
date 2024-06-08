import { useState, useEffect } from "react"
import { luminanceToWeight } from "../Colorific/utilities"
// import styled from '@emotion/styled/macro';

import { Event } from "../Colorific/constants/Events"
import Color from "../Colorific/Models/ColorModel"

export default function SwatchView(props) {

    const [WCAG, setWCAG] = useState(1)
    const [style, setStyle] = useState(null)
    const [value, setValue] = useState(parseFloat(props.model.color.lab_d65.l).toFixed(2))


    useEffect(() => {

        window.addEventListener('scroll', onScrollHandler);
        document.addEventListener(Event.SHOW_CONTRAST, onShowContrastHandler)

        qualityControl(props.model)
        const WCAGRatioOnWhite = props.model.color.contrast(new Color("#EEEEEE"), "WCAG21")
        setWCAG(WCAGRatioOnWhite)
        setStyle({
            backgroundColor: props.model.color.as("hex"),
            color: (WCAGRatioOnWhite > 3.0) ? "#E5EEFC" : "#000000",
            fontSize: '12px',
            fontWeight: (WCAGRatioOnWhite >= 3.0 && WCAGRatioOnWhite < 4.5) ? 700 : 400,
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: (props.model.priority > -1) ? 'underline' : 'none'
        })

        return () => {
            window.removeEventListener('scroll', onScrollHandler);
            document.removeEventListener(Event.SHOW_CONTRAST, onShowContrastHandler)
        }

    }, [])


    return (
        <div key={props.model.id} className="SwatchView" style={style}>
            {value}
            {/* {parseFloat(props.model.color.lab_d65.l).toFixed(2)} */}
            {/* {WCAG.toFixed(2)} */}
        </div>
    )

    function onShowContrastHandler(event) {
        console.log("onShowContrastHandler...", event)
    }

    
}

// const onKeyDownEventHandler = (event) => {
//     console.log(event)
//     // if (event.repeat) return;
//     // if (event.key === "3") { setIsControlDown(3) }
//     // if (event.key === "4") { setIsControlDown(4.5) }
//     // if (event.key === "7") { setIsControlDown(7) }
// }

const onScrollHandler = (event) => {
    console.info("onScrollHandler", event)
};

function anchorEmoji(priority) {
    if (priority === null || priority < 0) return " "
    if (priority === 0) return "⭐️"
    return "📍"
}

function qualityControl(model) {
    const value = model.color.as("hex")
    const clr = new Color(value)
    if (luminanceToWeight(model.color.lab.l) === "500") {
        const wcagOnWhite = model.color.contrast(new Color("#FFFFFF"), "WCAG21")
        const wcagOnBlack = model.color.contrast(new Color("#000000"), "WCAG21")
        // console.log(`${value} -> color-js(L* ${clr.lab_d65.l.toFixed(2)}) *** W: ${wcagOnWhite.toFixed(2)}/K: ${wcagOnBlack.toFixed(2)}`)
    }

}
