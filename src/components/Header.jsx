import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { clearSession } from '../db'
import { clearUser } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'

const Header = ({ title, subtitle }) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  const dispatch = useDispatch()

  const handleClearSession = async () => {
    try {
      dispatch(clearUser())
      await clearSession()
      
    } catch {

      console.log("Hubo un error al limpiar la sesión")
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.iconsContainer}>
        <View>
        {
          canGoBack && <Pressable onPress={() => navigation.goBack()}><Icon name="arrow-left-circle" size={32} color={colors.white} /></Pressable>
        }
        {/* <Image source={require('../../assets/logoo.svg')} /> No se puede SVG así */}
        </View>
        <Pressable style={styles.logout} onPress={handleClearSession}><Icon name="log-out" size={32} color={colors.white} /></Pressable>
      </View>

    </View>
  )
}




export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.terracota,
    height: 200,
    justifyContent: "center",

  },
  title: {
    fontSize: 36,
    color: colors.blanco,
    fontFamily: "MonserratB",
    textAlign:"center"
  },
  subtitle: {
    fontSize: 18,
    color: colors.blanco,
    textAlign:"center"
  },
  iconsContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 16
  },

})

