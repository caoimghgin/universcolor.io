import { useState, useEffect } from "react"
import Select from 'react-select'

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];

export default function ControlView(props) {

    const [query, setQuery] = useState("")
    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    const onSelectSwatchDisplayChangeHandler = async (event) => {
        setSelectedSwatchDisplayOption(event)
        props.setDelegate({ ...props.delegate, displayValue: event.value })
    }

    return (
        <div className="ControlView">
            <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
        </div>
    )
}
