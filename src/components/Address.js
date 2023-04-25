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
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import Icon from '@expo/vector-icons/FontAwesome'

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}
    renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [x, 0],
        });
        const pressHandler = () => {
          this.close();
          alert(text);
        };
        return (
          <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
            <RectButton
              style={[styles.rightAction, { backgroundColor: color }]}
              onPress={pressHandler}>
              <Text style={styles.actionText}>{text}</Text>
            </RectButton>
          </Animated.View>
        );
      };
      renderRightActions = progress => (
        <View style={{ width: 230, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
          {this.renderRightAction('Detalles', '#C8C7CD', 192, progress)}
          {this.renderRightAction('Sinalizar', '#ffab00', 220, progress)}
          {this.renderRightAction('Borrar', '#dd2c00', 64, progress)}
        </View>
      );
      updateRef = ref => {
        this._swipeableRow = ref;
      };
      close = () => {
        this._swipeableRow.close();
      };

    return (
        <Swipeable
            ref={this.updateRef}
            friction={2}
            rightThreshold={40}
            renderRightActions={this.renderRightActions}>
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
            <View className="h-6 w-6 rounded-xl border-[1.5px] border-neutral-400"></View>
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