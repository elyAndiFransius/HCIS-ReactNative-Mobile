import React, { useState } from 'react'
import { Switch as RNSwitch, SwitchProps } from "react-native";

function Switch({ ...props }: SwitchProps) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prev => !prev);
    
    return (
        <RNSwitch
            {...props}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#007BFF" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}

        />
    )
}

export default Switch