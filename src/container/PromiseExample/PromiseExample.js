import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'

export default function PromiseExample() {
    const one = () => {
        return "One"
    }

    const two = () => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    resolve("Two")
                }, 2000
            )
        })
    }

    const three = () => {
        return "Three"
    }

    const all = async () => {
        const oneData = one();
        console.log(oneData);

        const twoData = await two();
        console.log(twoData);

        const threeData = three();
        console.log(threeData);
    }

    useEffect(
        () => {
            all();
        },
    [])

    const display = (z) => {
        console.log(z);
    }

    const sum = (callFun) => {
        let x=10, y=5, z;

        z = x + y;

        callFun(z);
    }

    sum(display)

    return (
        <View>
            <Text>PromiseExample</Text>
        </View>
    )
}