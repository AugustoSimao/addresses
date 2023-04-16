import React, { Component } from 'react'
import { View,
    Text,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import BarraImg from '../../assets/imgs/Barra.jpg'

import Address from '../components/Address'
import AddAddress from './addAddress'

export default class Barra01 extends Component{

    state = {
        showDoneAddresses: true,
        showAddAddress: false,
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

    addAddress = newAddress => {
        if(!newAddress.desc || !newAddress.desc.trim()) {
            Alert.alert('Datos no válidos', 'Dirección no informada!')
            return 
        }

        const addresses = [...this.state.addresses]
        addresses.push({
            id: Math.random(),
            desc: newAddress.desc,
            estimateAT: newAddress.date,
            doneAt: null
        })
        this.setState({ addresses, showAddAddress: false}, this.filterAddresses)
    }

    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            
            <SafeAreaView className="flex-1">
                
                <AddAddress isVisible={this.state.showAddAddress}
                    onCancel={() => this.setState({showAddAddress: false})}
                    onSave={this.addAddress}/>
                
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

                <TouchableOpacity
                    className="absolute left-4 bottom-11 flex-row"
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddAddress: true })}>
                    <View className="bg-blue-500 h-6 w-6 rounded-full justify-center items-center">
                        <Icon name="plus" color={'#fff'}/>
                    </View>
                    <Text className="pl-3 font-extrabold text-blue-500 text-sm">Nueva dirección</Text>
                </TouchableOpacity>


            </SafeAreaView>
        )
    }
}