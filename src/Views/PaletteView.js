import ColumnView from "./ColumnView"
import WeightsView from "./WeightsView"
import LuminositiesView from "./LuminositiesView"

export default function PaletteView(props) {
    if (!props.model) return
    return (
        <div className="Palette">
            <WeightsView model={props.model.columns[0]}/>
            {props.model.columns.map(column => <ColumnView model={column} />)}
            <LuminositiesView/>
        </div>
    )
}