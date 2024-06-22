import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

export default function SwatchView(props) {

    const [model, setModel] = useState()
    const [fontSize, setFontSize] = useState("16px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#F1F1F1")
    const [color, setColor] = useState("#FFFFFF")
    const [contrastStandard, setContrastStandard] = useState("apca")
    const [delegate, setDelegate] = useState(props.delegate)
    const [displayContrast, setDisplayContrast] = useState("wcag21")
    const [displayValue, setDisplayValue] = useState(null)      // [L*d65, deltaPhiStar, wcag, ]

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    useEffect(() => {
        if (!model) return
        setBackground(model.value.destination)
        updateDisplayValue()
        updateDisplayStyle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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


    const updateDisplayStyle = () => {
        
        // Display user input values with underlines 
        if (model.priority > 0) setFontDecoration("underline")
            
    }

    const updateDisplayValue = () => {

        const { displayValue } = model.delegate

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
`;

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

    const onClickHandler = () => {
        console.log(model)
    }

    return (
        <SwatchViewStyled onClick={onClickHandler}>{displayValue}
            <SwatchViewDetailStyled></SwatchViewDetailStyled>
        </SwatchViewStyled>
    )
}