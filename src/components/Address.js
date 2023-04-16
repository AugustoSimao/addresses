import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

    return (
        <View className="flex-row items-center pr-2">
            <TouchableWithoutFeedback onPress={ () => props.toggleAddress(props.id)}>
                <View className="px-4 items-center justify-center">
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            
            <View className="border-neutral-300 border-b flex-1 py-2">
                <Text className="text-base text-slate-900" style={doneOrNotStyle}>{props.desc}</Text>
                {/* <Text>{props.estimateAt + ""}</Text>   */}
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View className="h-6 w-6 rounded-xl border-2 border-blue-500 items-center justify-center">
                <View className="h-4 w-4 rounded-xl bg-blue-500"></View>
            </View>
        )
    } else {
        return (
            <View className="h-6 w-6 rounded-xl border-2 border-neutral-300"></View>
        )
    }
    
}