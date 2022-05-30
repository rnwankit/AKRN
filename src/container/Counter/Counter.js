import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/action/counter.action';

function Counter(props) {
    const [count, setCount] = useState(0)

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter)

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    console.log(counter);
    return (
        <View
        style={{margin: 50}}
        >
            <TouchableOpacity
                onPress={() => handleIncrement()}
            >
                <Text>+</Text>
            </TouchableOpacity>
            <Text>{counter.count}</Text>
            <TouchableOpacity
                onPress={() => handleDecrement()}
            >
                <Text>-</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Counter;