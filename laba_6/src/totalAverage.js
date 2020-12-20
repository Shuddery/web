import React from 'react';

const totalAverage = (props) => {
    return (
    <div id="box">
        Средний балл:
    <span id="result">{props.totalAverage}</span>
    </div>
    )
};

export default totalAverage;