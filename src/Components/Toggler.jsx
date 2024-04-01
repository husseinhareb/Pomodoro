import React, {useState,useEffect} from 'react';


function Toggler(){
    const [counter,setCounter] = useState(0);
    
    const adder = () =>{
        setCounter(counter + 1);
    }
    const substractor = () =>{
        setCounter(counter -1);
    }

    useEffect(() =>{
        document.title = 'Counter:' +counter;
    }, [counter]);

    return (
        <div>
            
            <button onClick={substractor}>-</button>
            <h1>Counter: {counter}</h1>
            <button onClick={adder}>+</button>
        </div>
    )
}

export default Toggler;