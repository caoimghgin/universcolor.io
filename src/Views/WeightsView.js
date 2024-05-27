import { weights } from "../Colorific/constants"

export default function WeightsView(props) {
    if (!props.model) return
    return (
        <div className="Weights" style={{ display: 'flex'}}>
            {weights.map(weight => <WeightView model={weight} />)}
        </div>
    )
}

function WeightView(props) {
    if (!props.model) return
    return (
        <div className="Weight" style={{ width: 50, height: 24, fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.model}
        </div>
    )
}