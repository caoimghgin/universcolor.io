import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

export default function SwatchView(props) {

    const [model, setModel] = useState(null)
    const [fontColor, setFontColor] = useState("#FFFFFF")
    const [fontSize, setFontSize] = useState("0px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#F1F1F1")

    useEffect(() => {
        setModel(props.model)
    }, [])

    useEffect(() => {
        if (!model || !model.color) return
        console.log(model.value)
       setBackground(model.value)
    // setBackground(model.color.to(model.root).toString({precision: 2}))

    }, [model])

    const SwatchViewStyled = styled.div`
        display: 'flex';
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
`;

    return (

        <SwatchViewStyled>Z</SwatchViewStyled>
        // <SwatchViewStyled key={props.model.id ? props.model.id : "42"} onMouseEnter={onMouseEnterHandler} onClick={onClickHandler}>
        //     {value}
        //     <SwatchViewDetailStyled />
        //     {/* {parseFloat(props.model.color.lab_d65.l).toFixed(2)} */}
        //     {/* {WCAG.toFixed(2)} */}
        // </SwatchViewStyled>
    )

}