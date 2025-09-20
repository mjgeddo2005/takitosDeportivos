import { StyleSheet, Text } from 'react-native'

const MonserratRText = ({children, style}) => {
  return (
    <Text style={{ fontFamily: "MonserratR", ...style }}>{children}</Text>
  )
}

export default MonserratRText

const styles = StyleSheet.create({})