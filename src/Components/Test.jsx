import { useState } from "react";
function Test(){
    const [number,addNumber] = useState(0)
    const adding = () =>{
        addNumber(number + 1);
    }
    const subbing = () =>{
        addNumber(number - 1);
    }
    return(
        <div>
            <div>{number}</div>
            <button onClick={adding}>ADD ONE</button>
            <button onClick={subbing}>Sub One</button>
        </div>
    )
}

export default Test;