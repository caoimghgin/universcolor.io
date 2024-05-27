import { luminosities } from "../Colorific/constants"

export default function LuminositiesView() {
    return (
        <div className="Luminosities" style={{ display: 'flex'}}>
            {luminosities.map(luminosity => <LuminanceView model={luminosity} />)}
        </div>
    )
}

function LuminanceView(props) {
    return (
        <div className="Luminance" style={{ width: 50, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.model.toString()}
        </div>
    )
}