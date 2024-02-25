import Timer from './Timer'

function Pomodoro()
{
    const boxBackGroundColor = "#FFFFFF"; // Set the initial background color here
    return(
        <div className='pomodoroBox'>
            <Timer boxBackGroundColor={boxBackGroundColor} />
        </div>
    )
}
export default Pomodoro;
