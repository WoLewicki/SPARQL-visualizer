import styled from 'styled-components';
import ReactSlider from 'react-slider'

export const StyledSlider = styled(ReactSlider)`
    width: 100px;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 75px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

export const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 1 ? '#0f0' : '#ddd'};
    border-radius: 999px;
`;

export const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
