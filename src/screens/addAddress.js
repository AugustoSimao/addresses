import React, { Component } from 'react'
import {
    Text,
    Modal,
    View,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'

import moment from 'moment'

import DateTimePicker from '@react-native-community/datetimepicker'

const initialState = { desc: '', obs: '', territory: '', date: new Date() }

export default class AddAdress extends Component {
    state = {
        ...initialState
      };

      save = () => {
        const newAddress = {
            desc: this.state.desc,
            obs: this.state.obs,
            territory: this.state.territory,
            date: this.state.date,
        }

        this.props.onSave && this.props.onSave(newAddress)
        this.setState({ ...initialState })
    }
    
      getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />
        
        const dateString = moment(this.state.date).format('dddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                                           
                        <Text className="text-base text-blue-500">
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
        return datePicker
    }

    render() {
        
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <View className="flex-1 mt-14 bg-neutral-100 py-6 px-4 rounded-xl">
                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text className="text-center text-blue-500 text-base pb-3">Cancelar</Text>
                        </TouchableOpacity>
                        <Text className="text-center text-base font-bold pb-3">Nueva dirección</Text>
                        <TouchableOpacity onPress={this.save}>
                            <Text className="text-center text-blue-500 text-base pb-3">Salvar</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View className="bg-white rounded-xl px-4">
                        <TextInput className="py-4 text-base border-b border-neutral-300"
                            placeholder='Dirección...'
                            onChangeText={desc => this.setState({ desc })}
                            value={this.state.desc}></TextInput>
                        <TextInput className="py-4 text-base border-b border-neutral-300"
                            placeholder='Observaciones...'
                            onChangeText={obs => this.setState({ obs })}
                            value={this.state.obs}></TextInput>
                        <TextInput className="py-4 text-base"
                            placeholder='Territorio...'
                            onChangeText={territory => this.setState({ territory })}
                            value={this.state.territory}></TextInput>
                    </View>

                                        
                    <View className="bg-white rounded-xl px-4 mt-4">
                        <Text className="pt-3 pb-4 font-bold">Fecha de inclusión</Text>
                        <View className="flex-row">
                            <View className="h-7 w-7 bg-red-500 rounded-md justify-center items-center mr-4">
                                <Icon name="ios-calendar-outline" size={16} color={'#fff'}/>
                            </View>
                            <Text className=" pb-4 text-base text-blue-500">
                                {this.getDatePicker()}
                            </Text>
                        </View>
                    </View>
                    

                </View>
                
            </Modal>
        )
    }
}