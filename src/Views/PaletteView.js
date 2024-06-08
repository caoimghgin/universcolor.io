import ColumnView from "./ColumnView"
import WeightsView from "./WeightsView"
import LuminositiesView from "./LuminositiesView"

export default function PaletteView(props) {
    if (!props.model) return
    return (
        <div className="PaletteView">
            <WeightsView model={props.model.columns[0]}/>
            {props.model.columns.map((column, index) => <ColumnView key={index} model={column} />)}
            <LuminositiesView/>
        </div>
    )
}