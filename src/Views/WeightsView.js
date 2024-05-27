// import WeightView from "./WeightView"
import { weights } from "../Colorific/constants"

export default function WeightsView(props) {
    if (!props.model) return
    console.log(props)
    return (
        <div class="Weights" style={{ display: 'flex'}}>
            {weights.map(weight => <WeightView model={weight} />)}
        </div>
    )
}

function WeightView(props) {
    if (!props.model) return
    return (
        <div class="Weight" style={{ width: 50, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.model}
        </div>
    )
}