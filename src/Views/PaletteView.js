import ColumnView from "./ColumnView"
import WeightsView from "./WeightsView"
import LuminositiesView from "./LuminositiesView"

export default function PaletteView(props) {
    const { delegate } = props;
    return (
        <div className="PaletteView">
            <WeightsView model={props.model.columns[0]}/>
            {props.model.columns.map((model, index) => <ColumnView key={index} model={model} delegate={delegate} />)}
            <LuminositiesView/>
        </div>
    )
}