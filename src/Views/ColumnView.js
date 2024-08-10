import SwatchView from "./SwatchView"
import styled from '@emotion/styled/macro';

export default function ColumnView(props) {
    const { delegate } = props;
    return (
        <View className="ColumnView">
            {props.model.swatches.map((model, index) => {
                return <SwatchView key={index} model={model} delegate={delegate} semantic={props.model.semantic} />
            })}
        </View>
    )
}

const View = styled.div`
    display: flex;
    `