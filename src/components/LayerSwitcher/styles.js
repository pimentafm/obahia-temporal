import styled from 'styled-components';

export const LayerContainer = styled.div`
    .layer-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid;
        border-radius: 5px;
        border-color: #d9d9d9;
    }

    label {
        color: #000;
        margin-top: 0;
    }

    .ant-switch-checked {
        background-color: #1f5582;
    }
`;