import styled from 'styled-components';
import ReactSlider from 'react-slider'

export const StyledSlider = styled(ReactSlider)`
    width: 500px;
    height: 35px;
`;

const StyledThumb = styled.div`
    height: 35px;
    line-height: 35px;
    width: 100px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 20%;
    cursor: grab;
`;

export const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 0 ? '#0f0' : '#ddd'};
    border-radius: 999px;
`;

export const Track = (props, state) => <StyledTrack {...props} index={state.index} />;


