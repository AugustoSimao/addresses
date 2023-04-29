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

export default class addressList extends Component{

    state = {
        showDoneAddresses: true,
        showAddAddress: false,
        visibleAddresses: [],
        addresses: [{
            id: Math.random(),
            desc: 'Rua 1',
            obs: 'casa 4',
            territory: 'Barra 01',
            estimateAT: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            desc: 'Rua 2',
            obs: 'fin de la calle',
            territory: 'Barra 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 3',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 4',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 5',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 6',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 7',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 8',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 9',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 10',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 11',
            obs: 'casa 2',
            territory: 'Lagoa 01',
            estimateAT: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Rua 12',
            obs: 'casa 2',
            territory: 'Lagoa 01',
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
            obs: newAddress.obs,
            territory: newAddress.territory,
            estimateAT: newAddress.date,
            doneAt: null
        })
        this.setState({ addresses, showAddAddress: false}, this.filterAddresses)
    }

    deleteAddress = id => {
        const addresses = this.state.addresses.filter(address => address.id !== id)
        this.setState({ addresses }, this.filterAddresses)
    }

    render () {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            
            <SafeAreaView className="flex-1">
                
                <AddAddress isVisible={this.state.showAddAddress}
                    onCancel={() => this.setState({showAddAddress: false})}
                    onSave={this.addAddress}/>
                
                <View style={{flex: 1}}>
                
                    <View style={{flex: 3}}>
                        
                        <ImageBackground className="h-full" source={BarraImg}>
                            <View className="flex-1 justify-end">
                                <Text className="text-blue-100 font-extrabold text-5xl ml-5 mb-5">Territorio 01</Text>
                            </View>
                        </ImageBackground>
                        
                    </View>
                    
                    
                    <View style={{flex:6}}>

                        <View className="py-2 px-4 items-end">
                            <TouchableOpacity className="ml-5 content-end" onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneAddresses ? 'eye' : 'eye-slash'} size={28} color={'#3b82f6'} />
                            </TouchableOpacity>
                        </View>

                        <FlatList data={this.state.visibleAddresses}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Address {...item} toggleAddress={this.toggleAddress} onDelete={this.deleteAddress} />} />
                        
                    </View>

                    <TouchableOpacity
                        className="pl-4 pt-2 pb-5 flex-row bg-white"
                        activeOpacity={0.7}
                        onPress={() => this.setState({ showAddAddress: true })}>
                        <View className="bg-blue-500 h-6 w-6 rounded-full justify-center items-center">
                            <Icon name="plus" color={'#fff'}/>
                        </View>
                        <Text className="pl-3 font-extrabold text-blue-500 text-sm">Nueva dirección</Text>
                    </TouchableOpacity>
                    

                </View>




            </SafeAreaView>
        )
    }
}