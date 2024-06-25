import ColumnView from "./ColumnView"
import WeightsView from "./WeightsView"
import LuminositiesView from "./LuminositiesView"

export default function PaletteView(props) {
    const { model, delegate } = props;
    return (
        <div className="PaletteView">
            <WeightsView model={model.columns[0]}/>
            {model.columns.map((column, index) => <ColumnView key={index} model={column} delegate={delegate} />)}
            <LuminositiesView/>
        </div>
    )
}