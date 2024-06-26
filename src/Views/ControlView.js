import { useState, useEffect } from "react"
import Select from 'react-select'

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];

export default function ControlView(props) {

    const [delegate, setDelegate] = useState(props.delegate)
    const [query, setQuery] = useState("")
    const [selectedSwatchDisplayOption, setSelectedSwatchDisplayOption] = useState(swatchDisplayOptions[1]);
    const [value, setValue] = useState(null)

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        console.log("value changed", value)
    }, [value])

    const onSelectSwatchDisplayChangeHandler = async (event) => {
        // await new Promise(r => setTimeout(r, 100));
        setSelectedSwatchDisplayOption(event)
        props.setDelegate({ ...props.delegate, displayValue: event.value })
        // setValue(event.value)
        // console.log("SEND EVENT", event)
        // dispatchEvent(new CustomEvent("UPDATE_DISPLAY_VALUES", {detail: event.value}))


        // setDelegate({ ...delegate, displayValue: event.value });
    }

    return (
        <div className="ControlView">
            <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
            {/* {props.model.swatches.map((model, index) => <SwatchView key={index} model={model} delegate={delegate} />)} */}
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
            <input type="text" value={query} onChange={onChange} />
        </div>
    )
}
