import { luminosities } from "../Univers/constants"
import { luminanceToWeight } from "../Univers/utilities"
import styled from '@emotion/styled/macro';

const containerStyle = { display: 'flex' }
const itemStyle = { width: 50, height: 24, fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}

export default function WeightsView(props) {
    if (!props.model) return
    return (
        <div className="WeightsContainer" style={containerStyle}>
            {luminosities.map((luminosity, index) => <WeightView key={index} model={luminanceToWeight(luminosity)} />)}
        </div>
    )
}

function WeightView(props) {
    if (!props.model) return
    return (
        <div className="WeightView" style={itemStyle}>
            {props.model}
        </div>
    )
}