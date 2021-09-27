
import React from "react"
const Welcome = ({ name, age, color }) => {
    return (
        <div style={{ backgroundColor: color, fontSize: 25 }}>
            <h1 >name: {name}</h1>
            <h3>age: {age}</h3>
        </div>
    )
}

export default Welcome;