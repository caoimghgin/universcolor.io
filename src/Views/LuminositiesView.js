import { luminosities } from "../Univers/constants"

const containerStyle = { display: 'flex' }
const itemStyle = { width: 50, height: 24, fontSize: "12px", fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }

export default function LuminositiesView() {
    return (
        <div className="LuminocitiesContainer" style={containerStyle}>
            {luminosities.map((luminosity, index) => <LuminanceView key={index} model={luminosity} />)}
        </div>
    )
}

function LuminanceView(props) {
    return (
        <div className="LuminocityView" style={itemStyle}>
            {props.model.toString()}
        </div>
    )
}