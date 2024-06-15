import React, { useState, useEffect } from 'react';
import { luminanceToWeight, dpsConstrast } from "../Univers/utilities"
import styled from '@emotion/styled/macro';
import { calcAPCA } from 'apca-w3';

import { Event } from "../Univers/constants/Events"
import Color from "../Univers/Models/ColorModel"

export default function XSwatchView(props) {

    const [model, setModel] = useState(null)
    const [WCAG, setWCAG] = useState(1)
    const [style, setStyle] = useState(null)
    const [value, setValue] = useState(null)
    const [isVisible, setIsVisible] = React.useState(true)
    const [fontColor, setFontColor] = useState("#FFFFFF")
    const [fontSize, setFontSize] = useState("0px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#666666")
    const [contrastStandard, setContrastStandard] = useState("apca")
    const [displayMetric, setDisplayMetric] = useState("wcag21")      // [L*d65, deltaPhiStar, wcag, ]

    useEffect(() => {
        setModel(props.model)
        window.addEventListener("selectedContrastOptionEvent", selectedContrastOptionEventHandler)
        window.addEventListener("selectedSwatchDisplayOptionEvent", selectedSwatchDisplayOptionEventHandler)
        return () => {
            window.removeEventListener("selectedContrastOptionEvent", selectedContrastOptionEventHandler)
            window.removeEventListener("selectedSwatchDisplayOptionEvent", selectedSwatchDisplayOptionEventHandler)
        }
    }, [])

    useEffect(() => {
        if (!model) return
        if (model.color) setBackground(model.color.to(model.root).toString({precision: 2}))
    }, [model])

    useEffect(() => {
        if (!props.model) return
        if (displayMetric === "none") setValue("")
        if (displayMetric === "wcag21") setValue(props.model.color.contrast(new Color("#FFFFFF"), "WCAG21").toFixed(1))
        if (displayMetric === "apcalc_white") setValue(props.model.color.contrast(new Color("#FFFFFF"), "APCA").toFixed(1))
        if (displayMetric === "apcalc_black") setValue(props.model.color.contrast(new Color("#000000"), "APCA").toFixed(1))
        if (displayMetric === "ciel*d65") setValue(parseFloat(props.model.color.lab_d65.l).toFixed(1))
    }, [displayMetric]);

    useEffect(() => {
        if (!props.model) return

        if (contrastStandard === "wcag21") {
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

            setFontWeight(700)
            setFontSize(17.5)

            const LcW = Math.round(props.model.color.contrast(new Color("white"), "APCA"))
            const LcK = Math.round(props.model.color.contrast(new Color("black"), "APCA"))

            setFontColor((Math.abs(LcW) >= 60) ? "#FFFFFF" : "#000000")
            if ((Math.abs(LcW) >= 60)) setFontSize("16px")
            if ((Math.abs(LcW) >= 75)) setFontSize("12px")

            if ((props.model.priority > -1) && (Math.abs(LcW) < 60 && Math.abs(LcK) < 60)) {
                setFontDecoration('underline line-through')
            } else if ((props.model.priority > -1)) {
                setFontDecoration('underline')
            } else if ((Math.abs(LcW) < 60 && Math.abs(LcK) < 60)) {
                setFontDecoration('line-through')
            }



        }
    }, [contrastStandard])

    const selectedSwatchDisplayOptionEventHandler = (event) => {
        setDisplayMetric(event.detail.value)
    }

    const selectedContrastOptionEventHandler = (event) => {
        setContrastStandard(event.detail.value)
    }

    const onMouseEnterHandler = () => {
        // console.log(model.color.as("hex"))
    }

    const onClickHandler = () => {
        // const color = model.getColor()

        // const LcW = Math.round(calcAPCA("#FFFFFF", props.model.color.as("hex")))
        // const LcK = Math.round(calcAPCA("#000000", props.model.color.as("hex")))
        // console.log(`white:${LcW} black:${LcK}`)
        // console.log(model, model.color.as("hex"))

        model.color = null

        console.log(model.color.to("oklch").toString({precision: 2}))
        console.log(model.color.to("lch").toString({precision: 2}))

        // console.log("getColor", model.getColor())

    }

    const SwatchViewDetailStyled = styled.div`
        visibility: hidden;
        display: none;
        opacity:0;
        color: black;
        font-weight: 400;
        font-size: 14pt;
        background: ${background};
        transition:visibility 0.3s linear,opacity 0.3s linear;
        text-align: center;
        vertical-align: middle;
        line-height: 80px;
        width:100px;
        height:100px;
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
        background: ${background};
        font-size: ${fontSize};
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

        <div>X</div>
        // <SwatchViewStyled key={props.model.id ? props.model.id : "42"} onMouseEnter={onMouseEnterHandler} onClick={onClickHandler}>
        //     {value}
        //     <SwatchViewDetailStyled />
        //     {/* {parseFloat(props.model.color.lab_d65.l).toFixed(2)} */}
        //     {/* {WCAG.toFixed(2)} */}
        // </SwatchViewStyled>
    )


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
