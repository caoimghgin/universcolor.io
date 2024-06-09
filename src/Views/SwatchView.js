import React, { useState, useEffect } from 'react';
import { luminanceToWeight, dpsConstrast } from "../Colorific/utilities"
import styled from '@emotion/styled/macro';
import { calcAPCA } from 'apca-w3';

import { Event } from "../Colorific/constants/Events"
import Color from "../Colorific/Models/ColorModel"

export default function SwatchView(props) {

    const [model, setModel] = useState(null)
    const [WCAG, setWCAG] = useState(1)
    const [style, setStyle] = useState(null)
    const [value, setValue] = useState(parseFloat(props.model.color.lab_d65.l).toFixed(2))
    const [isVisible, setIsVisible] = React.useState(true)
    const [fontColor, setFontColor] = useState("#FFFFFF")
    const [fontSize, setFontSize] = useState("24px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")

    const [contrastStandard, setContrastStandard] = useState("apca")
    const [displayMetric, setDisplayMetric] = useState("wcag")      //[L*d65, deltaPhiStar, wcag, ]

    useEffect(() => {        
        setModel(props.model)

        if (contrastStandard === "wcag") {
            const WCAGRatioOnWhite = props.model.color.contrast(new Color("#FFFFFF"), "WCAG21")
            setWCAG(WCAGRatioOnWhite)
            setFontColor((WCAGRatioOnWhite > 3.0) ? "#FFFFFF" : "#000000")
            setFontWeight((WCAGRatioOnWhite >= 3.0 && WCAGRatioOnWhite < 4.5) ? 700 : 400)
            if (WCAGRatioOnWhite >= 3.0) setFontSize("18.66px") // Large Text
            if (WCAGRatioOnWhite >= 3.0) setFontWeight(700)
            if (WCAGRatioOnWhite >= 4.5) setFontSize("16px") // Large Text
            if (WCAGRatioOnWhite >= 4.5) setFontWeight(400)

            if (props.model.priority > -1) setFontDecoration('underline')

                

        } 

        if (contrastStandard === "apca") {
            const LcW = Math.round(calcAPCA("#FFFFFF", props.model.color.as("hex")))
            const LcK = Math.round(calcAPCA("#000000", props.model.color.as("hex")))

            setFontColor((Math.abs(LcW) >= 60) ? "#FFFFFF" : "#000000")
            if ((Math.abs(LcW) >= 60)) setFontSize("16px")
            if ((Math.abs(LcW) >= 60)) setFontWeight(700)
            if ((Math.abs(LcW) >= 75)) setFontSize("12px")

                if ((props.model.priority > -1) && (Math.abs(LcW) < 60 && Math.abs(LcK) < 60)) {
                    setFontDecoration('underline line-through')
                } else if ((props.model.priority > -1)) {
                    setFontDecoration('underline')
                } else if ((Math.abs(LcW) < 60 && Math.abs(LcK) < 60)) {
                    setFontDecoration('line-through')
                }
                    


        } 

        
        setValue(dpsConstrast(100, parseFloat(props.model.color.lab_d65.l).toFixed(2)))
        setValue(Math.round(calcAPCA("#FFFFFF", props.model.color.as("hex"))))
        // setValue(calcAPCA("#FFFFFF", props.model.color.as("hex")).toFixed(1))
        // setValue(calcAPCA("#000000", props.model.color.as("hex")).toFixed(1))
        // setValue("")

        window.addEventListener('scroll', onScrollHandler);
        document.addEventListener(Event.SHOW_CONTRAST, onShowContrastHandler)

        qualityControl(props.model)
        const WCAGRatioOnWhite = props.model.color.contrast(new Color("#FFFFFF"), "WCAG21")
        setWCAG(WCAGRatioOnWhite)
        // setStyle({
        //     backgroundColor: props.model.color.as("hex"),
        //     color: (WCAGRatioOnWhite > 3.0) ? "#E5EEFC" : "#000000",
        //     fontSize: '16px',
        //     fontWeight: (WCAGRatioOnWhite >= 3.0 && WCAGRatioOnWhite < 4.5) ? 700 : 400,
        //     width: 50,
        //     height: 50,
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     textDecoration: (props.model.priority > -1) ? 'underline' : 'none'
        // })




        return () => {
            window.removeEventListener('scroll', onScrollHandler);
            document.removeEventListener(Event.SHOW_CONTRAST, onShowContrastHandler)
        }

    }, [])

    const WCAGRatioOnWhite = props.model.color.contrast(new Color("#FFFFFF"), "WCAG21")

    const onMouseEnterHandler = () => {
        // console.log(model.color.as("hex"))
    }
     
    const onClickHandler = () => {
        console.log(model, model.color.as("hex"))
        const LcW = Math.round(calcAPCA("#FFFFFF", props.model.color.as("hex")))
        const LcK = Math.round(calcAPCA("#000000", props.model.color.as("hex")))
        console.log(`white:${LcW} black:${LcK}`)
    }

    const SwatchViewDetailStyled = styled.div`
        visibility: hidden;
        display: none;
        opacity:0;
        color: black;
        font-weight: 400;
        font-size: 14pt;
        background: black;
        transition:visibility 0.3s linear,opacity 0.3s linear;
        text-align: center;
        vertical-align: middle;
        line-height: 80px;
        width:200px;
        height:80px;
        filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.25)); 
    `

    const SwatchViewStyled = styled.div`
        display: ${props => (isVisible ? 'flex' : 'none')};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        visibility: visible;
        width: 50px;
        height: 50px;
        font-weight: ${fontWeight};
        background: ${props.model.color.as("hex")};
        font-size: ${fontSize};
        background: ${props.model.color.as("hex")};
        color: ${fontColor};
        text-decoration: ${fontDecoration};
        &:hover { 
            ${SwatchViewDetailStyled} {
                opacity:1;
                visibility: visible;
                display: inline-block;
                position: absolute;
        }
};
`;

    return (
        <SwatchViewStyled key={props.model.id} onMouseEnter={onMouseEnterHandler} onClick={onClickHandler}>
            {value}
            <SwatchViewDetailStyled/>
            {/* {parseFloat(props.model.color.lab_d65.l).toFixed(2)} */}
            {/* {WCAG.toFixed(2)} */}
        </SwatchViewStyled>
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
