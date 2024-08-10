import ColumnView from "./ColumnView"
import WeightsView from "./WeightsView"
import LuminositiesView from "./LuminositiesView"
import SemanticsView from "./SemanticsView";
import styled from '@emotion/styled/macro';

export default function PaletteView(props) {

    const { model, delegate } = props;

    return (
        <View className="PaletteView">
            <SemanticsView model={model} />
            <div>
                <WeightsView model={model.columns[0]} />
                {model.columns.map((column, index) => <ColumnView key={index} model={column} delegate={delegate} />)}
                <LuminositiesView />
            </div>
        </View>
    )
}

const View = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 24px;
    padding-left: 50px;
    `