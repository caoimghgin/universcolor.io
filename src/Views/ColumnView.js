import SwatchView from "./SwatchView"

export default function ColumnView(props) {
    const { delegate } = props;
    return (
        <div className="ColumnView" style={{ display: 'flex' }}>            
            {props.model.swatches.map((model, index) => <SwatchView key={index} model={model} delegate={delegate} />)}
        </div>
    )
}
