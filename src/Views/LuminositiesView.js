import { luminosities } from "../Colorific/constants"

export default function LuminositiesView() {
    return (
        <div class="Luminosities" style={{ display: 'flex'}}>
            {luminosities.map(luminosity => <LuminanceView model={luminosity} />)}
        </div>
    )
}

function LuminanceView(props) {
    return (
        <div class="Luminance" style={{ width: 50, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.model.toString()}
        </div>
    )
}