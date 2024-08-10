import styled from '@emotion/styled/macro';

export default function SemanticsView(props) {

    const {model} = props
    
    return (
        <View className="SemanticsContainer">
            {model.columns.map((item, index) => <SemanticView key={index} model={item.semantic} />)}
        </View>
    )
}

function SemanticView(props) {
    return (
        <ItemView className="SemanticsView">
            {props.model.toString()}
        </ItemView>
    )
}

const View = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 22px;
    padding-right: 16px;
    `

const ItemView = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    text-align: right;
    width: 64px;
    min-width: 64px;
    height: 50px;
    min-height: 50px;
    font-size: 12px;
    font-weight: 700;
    `