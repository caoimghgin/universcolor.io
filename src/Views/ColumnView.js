import SwatchView from "./SwatchView"

export default function ColumnView(props) {
    if (!props.model) return
    console.log(props)
    return (
        <div className="ColumnView" style={{ display: 'flex' }}>
            {props.model.swatches.map((model, index) => <SwatchView key={index} model={model} app={props.app} />)}
        </div>
    )
}
