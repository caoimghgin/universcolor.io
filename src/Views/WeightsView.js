import { weights, luminosities } from "../Univers/constants"
import { luminanceToWeight } from "../Univers/utilities"
// import { luminosities } from "../Univers/constants"

const containerStyle = { display: 'flex' }
const itemStyle = { width: 50, height: 24, fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}

export default function WeightsView(props) {
    if (!props.model) return
    return (
        <div className="WeightsContainer" style={containerStyle}>
            {/* {weights.map((weight, index) => <WeightView key={index} model={weight} />)} */}
            {luminosities.map((luminosity, index) => <WeightView key={index} model={luminanceToWeight(luminosity)} />)}

        </div>
    )
}
// console.log(luminanceToWeight(62))

function WeightView(props) {
    if (!props.model) return
    return (
        <div className="WeightView" style={itemStyle}>
            {props.model}
        </div>
    )
}