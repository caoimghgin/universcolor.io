import { useState } from "react"
import Select from 'react-select'

export default function SideNav(props) {

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
        <div className="SideNav" style={style}>
            <Select defaultValue={selectedSwatchDisplayOption} onChange={onSelectSwatchDisplayChangeHandler} options={swatchDisplayOptions} />
        </div>
    )
}

const style = {
    height: "100%", /* 100% Full-height */
    width: "300px", /* 0 width - change this with JavaScript */
    top: "0", /* Stay at the top */
    left: "0",
    backgroundColor: "#F4F4F4",
    padding: "36px"
    // overflowX: "hidden", /* Disable horizontal scroll */
    // paddingTop: "60px", /* Place content 60px from the top */
    // transition: "0.5s" /* 0.5 second transition effect to slide in the sidenav */
};

const swatchDisplayOptions = [
    { value: 'none', label: 'NONE' },
    { value: 'ciel*d65', label: 'CIE L* (d65)' },
    { value: 'apcalc_white', label: 'APCA' },
    { value: 'wcag21', label: 'WCAG21' },
];