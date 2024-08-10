import { useState } from "react"
import Select from 'react-select'
import styled from '@emotion/styled/macro';

export default function SideNav(props) {

    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);

    const onSelectSwatchDisplayChangeHandler = async (event) => {
        setSelectedSwatchDisplayOption(event)
        props.setDelegate({ ...props.delegate, displayValue: event.value })
    }

    return (
        <View className="SideNav">
            <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
        </View>
    )
}

const View = styled.div`
    height: 100%;
    width: 300px;
    top: 0;
    left: 0;
    background-color: #F4F4F4;
    padding: 36px;
`;

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];