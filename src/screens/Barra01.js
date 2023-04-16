import React, { Component } from 'react'
import { View, Text, ImageBackground, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import BarraImg from '../../assets/imgs/Barra.jpg'

import Address from '../components/Address.js'
import AddAdress from './addAddress'

export default class Barra01 extends Component{

    state = {
        showDoneAddresses: true,
        showAddAddress: true,
        visibleAddresses: [],
        addresses: [{
            id: Math.random(),
            desc: 'Rod. Jornalista Manoel de Menezes, 2580',
            estimateAT: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            desc: 'R. Laurindo José de Souza, 218',
            estimateAT: new Date(),
            doneAt: null,
        },]
    }

    componentDidMount = () => {
        this.filterAddresses()
    }

    toggleFilter = () => {
        this.setState({ showDoneAddresses: !this.state.showDoneAddresses }, this.filterAddresses)
    }

    filterAddresses = () => {
        let visibleAddresses = null
        if(this.state.showDoneAddresses) {
            visibleAddresses = [...this.state.addresses]
        } else {
            const pending = address => address.doneAt === null
            visibleAddresses = this.state.addresses.filter(pending)
        }

        this.setState({ visibleAddresses })
        
    }

    toggleAddress = addressId => {
        const addresses = [...this.state.addresses]
        addresses.forEach(address => {
            if(address.id === addressId) {
                address.doneAt = address.doneAt ? null : new Date()
            }
        })

        this.setState({ addresses }, this.filterAddresses)
    }

    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <SafeAreaView className="flex-1">
                <AddAdress isVisible={this.showAddAddress} onCancel={() => this.setState({showAddAddress: false}) }/>
                <View className="flex">
                    
                    <View className="h-1/3">
                        
                        <ImageBackground className="h-full" source={BarraImg}>
                            <View className="flex-1 justify-end">
                                <Text className="text-blue-100 font-extrabold text-5xl ml-5 mb-5">Barra 01</Text>
                            </View>
                        </ImageBackground>
                        
                    </View>
                    
                    
                    <View className="h-2/3">

                        <View className="py-2 px-4 items-end">
                            <TouchableOpacity className="ml-5 content-end" onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneAddresses ? 'eye' : 'eye-slash'} size={28} color={'#3b82f6'} />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={this.state.visibleAddresses}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Address {...item} toggleAddress={this.toggleAddress} />} />
                        
                    </View>
                    

                </View>
            </SafeAreaView>
        )
    }
}