import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { fontLookupAPCA } from 'apca-w3';
import dogEarOnDark from "../Assets/dogEar-onLight.svg"
import dogEarOnLight from "../Assets/dogEar-onDark.svg" 

export default function SwatchView(props) {

    const { semantic } = props
    const { weight } = props.model.weight
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
    const [outlineColor, setOutlineColor] = useState(null)

    useEffect(() => {
        if (!props.model || !props.delegate) return
        setModel({ ...props.model, delegate: props.delegate })
    }, [props.model, props.delegate])

    useEffect(() => {
        if (!model) return
        setBackground(model.value.destination)
        updateDisplayValue()
        // updateDisplayStyle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model])

    useEffect(() => {
        if (!color) return
        setOutlineColor((color === "#FFFFFF" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.33)"))
    }, [color])

    const updateDisplayAPCA = () => {

        setFontWeight(400)
        const fontLookupWhite = fontLookupAPCA(model.apca_white, 2)
        const fontLookupBlack = fontLookupAPCA(model.apca_black, 2)

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

        if (Math.abs(model.apca_white) > Math.abs(model.apca_black)) {
            setDisplayValue((Math.floor(model.apca_white * 100) / 100).toFixed(1))
        } else {
            setDisplayValue((Math.floor(model.apca_black * 100) / 100).toFixed(1))
        }

    }

    const updateDisplayCIEL = () => {

        setFontWeight(400)
        setFontSize("1rem")

        const fontLookupWhite = fontLookupAPCA(model.apca_white, 2)
        const fontLookupBlack = fontLookupAPCA(model.apca_black, 2)

        if (fontLookupWhite[4] <= 18.666) {
            setColor("#FFFFFF")
        } else if (fontLookupWhite[7] <= 18.666) {
            setColor("#FFFFFF")
        } else if (fontLookupBlack[4] <= 18.666) {
            setColor("#000000")
        } else if (fontLookupBlack[7] <= 18.666) {
            setColor("#000000")
        }

        setDisplayValue((model.lab_d65_l).toFixed(1))
    }

    const updateDisplayWCAG21 = () => {

        if (model.wcag_white < 3.0) {
            setColor("#000000")
            setFontWeight(400)
            setFontSize("1.0rem")
        }

        if (model.wcag_white >= 3.0 && model.wcag_white < 4.5) {
            setColor("#FFFFFF")
            setFontWeight(700)
            setFontSize("1.1665rem")
        }

        if (model.wcag_white >= 4.5) {
            setColor("#FFFFFF")
            setFontWeight(400)
            setFontSize("1.0rem")
        }

        if (model.wcag_white < 3.0) {
            setDisplayValue((Math.floor(model.wcag_black * 100) / 100))
        } else {
            setDisplayValue((Math.floor(model.wcag_white * 100) / 100))
        }

    }

    const updateDisplayValue = () => {

        const { displayValue } = model.delegate

        // if (model.priority > 0) {
        //     setFontDecoration("underline")
        // } else {
        //     setFontDecoration("none")
        // }

        switch (displayValue) {
            case "wcag21":
                updateDisplayWCAG21()
                break;
            case "ciel*d65":
                updateDisplayCIEL()
                break;
            case "apcalc_white":
                updateDisplayAPCA()
                break;
            case "apcalc_black":
                setDisplayValue(model.apca_black)
                break;
            default:
                setDisplayValue("")
        }
    }

    const ViewHovered = styled.div`
        visibility: hidden;
        display: none;
        opacity:0;
        font-weight: 700;
        padding-top: 8px;
        font-size: 11pt;
        background: ${background};
        color: ${color};
        transition:visibility 0.3s linear,opacity 0.3s linear;
        text-align: center;
        z-index: 1000;
        width: 140px;
        min-width: 140px;
        height: 130px;
        min-height: 130px;
        filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.25)); 
        outline: 1px solid ${outlineColor};
        outline-offset: -5px;
          &:before {
            content: " ";
            position: absolute;
            z-index: -1;
            top: 45px;
            left: 45px;
            right: 45px;
            bottom: 45px;
            border: 1px solid ${outlineColor};
            }
        &:after {
            content: " ";
            position: absolute;
            z-index: -1;
            top: 50px;
            left: 50px;
            right: 50px;
            bottom: 50px;
            border: ${model && model.priority > 0 ? `1px solid ${outlineColor}` : null} ;
            }
`;

    const View = styled.div`
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        background: ${background};

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        visibility: visible;
        font-weight: ${fontWeight};
        font-size: ${fontSize};
        color: ${color};
        text-decoration: ${fontDecoration};
        &:hover { 
            ${ViewHovered} {
                opacity:1;
                visibility: visible;
                display: inline-block;
                position: absolute;
        };
`;

    const onClickHandler = () => {
        console.log(model)
    }

    const jjj = () => {
        if (!model) return
        if (model.priority > 0) {
            return {
                outline: `1px solid ${outlineColor}`,
                outlineRadius: `2px`,
                outlineOffset: "-5px"
            }
        }

    }

    const LuminosityView = styled.div`
    font-size:9.5pt;
        font-weight: 400;
        padding-top: 1.5px;
        `
    const dogEarIcon = () => {

        const View = styled.img`
          position: absolute;
          top: 1px;
          right: 1px;`

        if (model && model.priority > 0) {
            if (color === "#FFFFFF") {
                return (<View src={dogEarOnLight} alt="DogEar Icon" />)
            } else {
                return (<View src={dogEarOnDark} alt="DogEar Icon" />)
            }
        }

    }

    return (
        <View onClick={onClickHandler}>
            {dogEarIcon()}
            {displayValue}
            <ViewHovered>
                {semantic}-{props.model.weight}
                <LuminosityView>L*{model ? (model.lab_d65_l).toFixed(1) : ""}</LuminosityView>
            </ViewHovered>
        </View>
    )
}



const sss = {
    outline: "2px solid blue",
    outlineOffset: "-4px"

}

// https://lch.oklch.com/#70,39,242,100