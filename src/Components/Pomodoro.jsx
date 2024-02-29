import React, { useState } from 'react';
import Timer from './Timer';

function Pomodoro() {
    const [selectedMode, setSelectedMode] = useState('Pomodoro');

    const handleSelectedModeChange = (mode) => {
        setSelectedMode(mode);
    };

    if(selectedMode === 'Pomodoro'){

    }if(selectedMode === 'ShortBreak'){

    }if(selectedMode === 'LongBreak'){
        
    }
    return (
        <div className='pomodoroBox' style={{backgroundColor=}}>
            <Timer onSelectMode={handleSelectedModeChange} />
        </div>
    );
}

export default Pomodoro;
