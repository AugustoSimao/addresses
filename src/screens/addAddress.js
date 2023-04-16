import React, { Component } from 'react'
import {
    Modal,
    View,
    TouchableWithoutFeedback
} from 'react-native'

export default class AddAdress extends Component {
    render () {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View className="flex-1 bg-black opacity-70"></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}