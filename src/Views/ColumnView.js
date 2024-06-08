import SwatchView from "./SwatchView"

const containerStyle = { display: 'flex' }

export default function ColumnView(props) {
    if (!props.model) return
    return (
        <div className="ColumnView" style={containerStyle}>
            {props.model.swatches.map((model, index) => <SwatchView key={index} model={model} />)}
        </div>
    )
}
