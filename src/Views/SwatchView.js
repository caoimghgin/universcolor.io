import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

export default function SwatchView(props) {

    const [model, setModel] = useState(null)
    const [fontSize, setFontSize] = useState("22px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#F1F1F1")
    const [color, setColor] = useState("#FFFFFF")
    const [contrastStandard, setContrastStandard] = useState("apca")
    const [delegate, setDelegate] = useState(props.delegate)
    const [displayContrast, setDisplayContrast] = useState("wcag21")
    const [displayValue, setDisplayValue] = useState(null)      // [L*d65, deltaPhiStar, wcag, ]

    useEffect(() => {
        if (props.model) setModel(props.model)
    }, [])

    // useEffect(() => {
    //     // const a = JSON.stringify(model)
    //     // const b = JSON.stringify({...props.model, ...props.delegate})
    //     // if (a === b) return
    //     setModel(props.model)
    //     // console.log("update...")

    //     // if (model === {...props.model, ...props.delegate}) return 
    //     // if (!props.model || !props.delegate) return
    //     // const {model, delegate} = props
    //     // const result = {...props.model, ...props.delegate}
    //     // if (model !== result) {
    //     //     console.log(model)
    //     //     setModel({...props.model, ...props.delegate})
    //     // }
        
    //     // setDelegate(props.delegate)
    // })

    // useEffect(() => {
    //     if (displayContrast !== delegate.displayContrast) updateDisplayContrast()
    //     if (displayValue !== delegate.displayValue) updateDisplayValue()
    // }, [delegate])

    useEffect(() => {
        if (!model || !model.color) return
        setBackground(model.destination.value)
        // updateDisplayValue()
    }, [model])

    const updateDisplayContrast = () => {

        // const { displayContrast } = delegate

        // switch (displayContrast) {
        //     case "wcag21":
        //         setDisplayValue(displayContrast)
        //         break;
        //     case "apca":
        //         setDisplayValue(displayContrast)
        //         break;
        //     default:
        //         setDisplayValue(displayContrast)
        // }
    }

    const updateDisplayValue = () => {

        // const { displayValue } = model.displayValue
        // console.log(model)
        return

        if (!model) return

        switch (displayValue) {
            case "none":
                setDisplayValue("")
                break;
            case "wcag21":
                setDisplayValue(model.color.wcag)
                break;
            case "ciel*d65":
                setDisplayValue((model.color.lab_d65.l).toFixed(1))
                break;
            case "apcalc_white":
                setDisplayValue(model.color.apca_white)
                break;
            case "apcalc_black":
                setDisplayValue(model.color.apca_black)
                break;
            default:
                setDisplayValue("XXX")
        }
    }

    const selectedContrastOptionEventHandler = (event) => {
        console.log("selectedContrastOptionEventHandler")
        setContrastStandard(event.detail.value)
    }

    const selectedSwatchDisplayOptionEventHandler = (event) => {
        console.log("selectedSwatchDisplayOptionEventHandler")
        // setDisplayMetric(event.detail.value)
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
        <SwatchViewStyled onClick={onClickHandler}>{displayValue}
            <SwatchViewDetailStyled></SwatchViewDetailStyled>
        </SwatchViewStyled>
    )
}