import SwatchView from "./SwatchView"

export default function ColumnView(props) {
    if (!props.model) return
    return (
        <div className="Column" style={{ display: 'flex'}}>
            {props.model.swatches.map(swatch => <SwatchView model={swatch} />)}
        </div>
    )
}
