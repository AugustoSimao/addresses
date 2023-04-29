import React from 'react'
import {
    Animated,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    I18nManager
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from '@expo/vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity className="bg-red-600 flex-row items-center justify-end px-4"
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

  //   const getLeftContent = () => {
  //     return (
  //         <View style={styles.left}>
  //             <Icon name="trash" size={20} color='#FFF'
  //                 style={styles.excludeIcon} />
  //             <Text style={styles.excludeText}>Excluir</Text>
  //         </View>
  //     )
  // }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      // renderLeftActions={getLeftContent}
      // onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
      >
        <View className="flex-row items-center pr-2">
            <TouchableWithoutFeedback onPress={ () => props.toggleAddress(props.id)}>
                <View className="px-4 items-center justify-center">
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            
            <View className="border-neutral-300 border-b flex-1 py-2 bg-white">
                <Text className="text-base text-slate-900" style={doneOrNotStyle}>{props.desc}</Text>
                <Text className="text-sm text-neutral-400">{props.obs + ' (' + props.territory + ')'}</Text>
            </View>
        </View>
    </Swipeable>
  )
}

function getCheckView(doneAt) {
  if(doneAt != null) {
      return (
          <View className="h-6 w-6 rounded-xl border-[1.5px] border-blue-500 items-center justify-center">
              <View className="h-4 w-4 rounded-xl bg-blue-500"></View>
          </View>
      )
  } else {
      return (
          <View className="h-6 w-6 rounded-xl border-[1.5px] border-neutral-300"></View>
      )
  }
    
}


const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});