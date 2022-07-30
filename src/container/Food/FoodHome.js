import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../assets/colors/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FoodHome() {
  return (
    <View>
      <Text style={styles.fontEx}>FoodHome</Text>
      <Icon name="accessibility-new" size={30} color="#4F8EF7" />
    </View>
  )
}

export const styles = StyleSheet.create({
    fontEx: {
        color: colors.price,
        fontSize: 50,
        fontFamily: 'Montserrat-Regular'
    }
})