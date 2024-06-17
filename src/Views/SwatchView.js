import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

export default function SwatchView(props) {

    const [model, setModel] = useState(null)
    const [fontSize, setFontSize] = useState("22px")
    const [fontWeight, setFontWeight] = useState(400)
    const [fontDecoration, setFontDecoration] = useState("none")
    const [background, setBackground] = useState("#F1F1F1")
    const [color, setColor] = useState("#FFFFFF")

    useEffect(() => { 
        setModel(props.model)
    }, [])

    useEffect(() => {
        if (!model || !model.color) return
        setBackground(model.destination.value)
    }, [model])

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

    return (
        <SwatchViewStyled>X
        <SwatchViewDetailStyled>X</SwatchViewDetailStyled>
        </SwatchViewStyled>
    )

}