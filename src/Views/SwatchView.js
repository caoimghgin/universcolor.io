import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { fontLookupAPCA } from 'apca-w3';

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

        // const foo = fontLookupAPCA(90, 2)
        // console.log("FOO", foo)
        // console.log("NORMAL:", foo[4])

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

            if (model.delegate.displayContrast === "apca") {
                setFontWeight(400)
                const fontLookupWhite = fontLookupAPCA(model.color.apca_white, 2)
                const fontLookupBlack = fontLookupAPCA(model.color.apca_black, 2)

                if (fontLookupWhite[4] <= 18.666) {
                    setColor("#FFFFFF")
                    setFontSize(`${fontLookupWhite[4]}px`)
                    setFontWeight(400)
                } else if (fontLookupWhite[7] <= 18.666) {
                    setColor("#FFFFFF")
                    setFontSize(`${fontLookupWhite[7]}px`)
                    setFontWeight(700)
                } else if (fontLookupBlack[4] <= 18.666) {
                    setColor("#000000")
                    setFontSize(`${fontLookupBlack[4]}px`)
                    setFontWeight(400)
                } else if (fontLookupBlack[7] <= 18.666) {
                    setColor("#000000")
                    setFontSize(`${fontLookupBlack[7]}px`)
                    setFontWeight(700)
                } 

                // setFontSize()`${}px`)
                return
            }


        if (model.delegate.displayContrast === "wcag21") {

            if (model.color.wcag_white < 3.0) {
                setColor("#000000")
                setFontWeight(400)
                setFontSize("1.0rem")
            }

            if (model.color.wcag_white >= 3.0 && model.color.wcag_white < 4.5) {
                setColor("#FFFFFF")
                setFontWeight(700)
                setFontSize("1.1665rem")
            }

            if (model.color.wcag_white >= 4.5 ) {
                setColor("#FFFFFF")
                setFontWeight(400)
                setFontSize("1.0rem")
            }

            // Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
            // WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.

        }

    }

    const updateDisplayValue = () => {

        const { displayValue } = model.delegate

        switch (displayValue) {
            case "none":
                setDisplayValue("")
                break;
            case "wcag21":
                if (model.color.wcag_white < 3.0) {
                    setDisplayValue((Math.floor(model.color.wcag_black * 100) / 100))
                    break;
                }
                setDisplayValue((Math.floor(model.color.wcag_white * 100) / 100))
                break;
            case "ciel*d65":
                setDisplayValue((model.color.lab_d65.l).toFixed(1))
                break;
            case "apcalc_white":
                
                if (Math.abs(model.color.apca_white) > Math.abs(model.color.apca_black)) {
                    setDisplayValue((Math.floor(model.color.apca_white * 100) / 100).toFixed(1))

                } else {
                    // setDisplayValue("X")
                    setDisplayValue((Math.floor(model.color.apca_black * 100) / 100).toFixed(1))

                }


                // if (model.color.apca_white > model.color.apca_black) {
                // } else {
                //     setDisplayValue((Math.floor(model.color.apca_white * 100) / 100))
                //     setDisplayValue((Math.floor(model.color.apca_black * 100) / 100))

                // }
                return





                break;
            case "apcalc_black":
                setDisplayValue(model.color.apca_black)
                break;
            default:
                setDisplayValue("XXX")
        }
    }

    const updateDisplayAPCA = () => {
        if (Math.abs(model.color.apca_white) > Math.abs(model.color.apca_black)) {
            setDisplayValue((Math.floor(model.color.apca_white * 100) / 100).toFixed(1))
        } else {
            setDisplayValue((Math.floor(model.color.apca_black * 100) / 100).toFixed(1))
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
        console.log(model.color.as("hex"))

        const fontLookupWhite = fontLookupAPCA(model.color.apca_white, 2)
        const fontLookupBlack = fontLookupAPCA(model.color.apca_black, 2)

        console.log("fontLookupWhite", fontLookupWhite)
        console.log("fontLookupBlack", fontLookupBlack)

    }


    return (
        <SwatchViewStyled onClick={onClickHandler}>{displayValue}
            <SwatchViewDetailStyled></SwatchViewDetailStyled>
        </SwatchViewStyled>
    )
}