import { luminosities } from "../Univers/constants"
import styled from '@emotion/styled/macro';

export default function LuminositiesView() {
    return (
        <View className="LuminocitiesContainer">
            {luminosities.map((luminosity, index) => <LuminanceView key={index} model={luminosity} />)}
        </View>
    )
}

function LuminanceView(props) {
    return (
        <ItemView className="LuminocityView">
            {props.model.toString()}
        </ItemView>
    )
}

const View = styled.div`
    display: flex;
    `

const ItemView = styled.div`
    display: flex;
    width: 50px;
    height:24;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    `