import React, { Component } from 'react'
import {
    Text,
    Modal,
    View,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity
} from 'react-native'

const initialState = { desc: '' }

export default class AddAdress extends Component {
    state = {
        ...initialState
      };

    render() {
        
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <View className="mt-14 bg-neutral-100 py-6 px-4 rounded-xl">
                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text className="text-center text-blue-500 text-base pb-3">Cancelar</Text>
                        </TouchableOpacity>
                        <Text className="text-center text-base font-bold pb-3">Nueva dirección</Text>
                        <TouchableOpacity>
                            <Text className="text-center text-blue-500 text-base pb-3">Salvar</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View className="bg-white rounded-xl px-4">
                        <TextInput className=" py-4 text-base border-b border-neutral-300"
                            placeholder='Dirección...'
                            onChangeText={desc => this.setState({ desc })}
                            value={this.state.desc}></TextInput>
                        <TextInput className="py-4 text-base"
                            placeholder='Observaciones...'></TextInput>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View className="flex-1 bg-black opacity-70"></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}