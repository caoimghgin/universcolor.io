import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

export default function SwatchView(props) {
    console.log("SwatchView:", props)

    const [model, setModel] = useState(null)
    const [fontSize, setFontSize] = useState("22px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#F1F1F1")
    const [color, setColor] = useState("#FFFFFF")
    const [contrastStandard, setContrastStandard] = useState("apca")
    const [displayMetric, setDisplayMetric] = useState("wcag21")      // [L*d65, deltaPhiStar, wcag, ]
    const [value, setValue] = useState("")      // [L*d65, deltaPhiStar, wcag, ]
    const [app, setApp] = useState(props.app)

    useEffect(() => {
        if (!props.model) return
        // console.log("APP:", app)

        setModel(props.model)
        setApp(props.app)

        // window.addEventListener("selectedContrastOptionEvent", selectedContrastOptionEventHandler)
        // window.addEventListener("selectedSwatchDisplayOptionEvent", selectedSwatchDisplayOptionEventHandler)
        // return () => {
        //     window.removeEventListener("selectedContrastOptionEvent", selectedContrastOptionEventHandler)
        //     window.removeEventListener("selectedSwatchDisplayOptionEvent", selectedSwatchDisplayOptionEventHandler)
        // }
    }, [])

    useEffect(() => {
        console.log("-->", app)
    }, [app])

    useEffect(() => {
        if (!model || !model.color) return
        setBackground(model.destination.value)
        // console.log(model.color.foo)
    }, [model])

    useEffect(() => {
        if (!props.model) return
        if (displayMetric === "none") setValue("")
        // if (displayMetric === "wcag21") setValue(model.color.wcag_white) 
        // if (displayMetric === "apcalc_white") setValue(model.color.apca_white) 
        // if (displayMetric === "apcalc_black") setValue(model.color.apca_black)
        // if (displayMetric === "ciel*d65") setValue(model.color.lab_d65.l.toFixed(1))
    }, [displayMetric]);

    const selectedContrastOptionEventHandler = (event) => {
        console.log("selectedContrastOptionEventHandler")
        setContrastStandard(event.detail.value)
    }

    const selectedSwatchDisplayOptionEventHandler = (event) => {
        console.log("selectedSwatchDisplayOptionEventHandler")
        setDisplayMetric(event.detail.value)
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        visibility: visible;
        width: 50px;
        height: 50px;
        font-weight: ${fontWeight};
        background: ${background};
        font-size: ${fontSize};
        color: ${color};
        text-decoration: ${fontDecoration};
        &:hover { 
            ${SwatchViewDetailStyled} {
                opacity:1;
                visibility: visible;
                display: inline-block;
                position: absolute;
        };
`;

function onClickHandler(event) {
}

    return (
        <SwatchViewStyled onClick={onClickHandler}>{props.app.a}
        <SwatchViewDetailStyled></SwatchViewDetailStyled>
        </SwatchViewStyled>
    )

}