import './Counter.css'
import React, { useState,useEffect } from 'react'
const Counter = () => {
    const [counter, setCounter] = useState(10)
    const handleAddClick = () => {
        console.log(counter)
        setCounter(counter + 1)
    }
    const handleMinuslick = () => {
        console.log(counter)
        setCounter(counter - 1)
    }

    useEffect(()=>{
        document.title = `Counter: ${counter}`
    },[counter])
    var value=0
    return (
        <div>
            <button className="counter-button" onClick={handleMinuslick}>-</button>
            <span>{counter}</span>
            <button onClick={handleAddClick}>+</button>
        </div>
    )
}

export default Counter;