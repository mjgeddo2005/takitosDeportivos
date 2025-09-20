import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from '../../global/colors';
import { useSignupMutation } from "../../services/authApi";
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { clearCart } from "../../store/slices/cartSlice";

const textInputWidth = Dimensions.get('window').width * 0.8

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [triggerLogin, result] = useSignupMutation()

  const [isFocused, setIsFocused] = useState({ rpsswd: false, psswd: false, email: false });


  const dispatch = useDispatch()


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    Alert.alert("Éxito", "Registro completado correctamente ");

    triggerLogin({ email, password })
    console.log(result)
  };

  useEffect(() => {
    if (result.status === "fulfilled") {
      dispatch(setUserEmail(result.data.email))
      dispatch(setLocalId(result.data.localId))
      dispatch(clearCart())
    }
  }, [result])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Takitos Deportivos</Text>
      <Text style={styles.subTitle}>Registrate</Text>
      <View style={styles.inputContainer}>

        <TextInput
          style={[
            styles.textInput,
            isFocused.email ? styles.focusedInput : styles.unfocusedInput,
          ]}
          onFocus={() => setIsFocused(prevState => ({ ...prevState, email: true }))}
          onBlur={() => setIsFocused(prevState => ({ ...prevState, email: false }))}
          placeholder="Email"
          placeholderTextColor={colors.white}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}


        />

        <TextInput
          style={[
            styles.textInput,
            isFocused.psswd ? styles.focusedInput : styles.unfocusedInput,
          ]}
          onFocus={() => setIsFocused(prevState => ({ ...prevState, psswd: true }))}
          onBlur={() => setIsFocused(prevState => ({ ...prevState, psswd: false }))}
          placeholder="Contraseña"
          placeholderTextColor={colors.white}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={[
            styles.textInput,
            isFocused.rpsswd ? styles.focusedInput : styles.unfocusedInput,
          ]}
          onFocus={() => setIsFocused(prevState => ({ ...prevState, rpsswd: true }))}
          onBlur={() => setIsFocused(prevState => ({ ...prevState, rpsswd: false }))}
          placeholder="Repetir Contraseña"
          placeholderTextColor={colors.white}
          secureTextEntry
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />
      </View>
      <Pressable style={styles.btn} onPress={handleRegister}><Text style={styles.btnText}>Regístrarse</Text></Pressable>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.whiteText}>Volver al login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.terracota
  },
  title: {
    color: colors.blanco,
    fontFamily: "MonserratB",
    fontSize: 36
  },
  subTitle: {
    fontSize: 18,
    color: colors.blanco,
    fontWeight: '700',
    letterSpacing: 3
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: 'center',

  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    color: colors.blancoFrio,
    width: textInputWidth,
  },
  unfocusedInput: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: colors.blancoFrio,
  },
  focusedInput: {
    backgroundColor: colors.terracotaClaro,
    borderBottomWidth: 0,
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  whiteText: {
    color: colors.white,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  btn: {
    padding: 10,
    paddingHorizontal: 32,
    backgroundColor: colors.celeste,
    borderRadius: 16,
    marginTop: 32
  },
  btnText: {
    color: colors.blanco,
    fontFamily: "MonserratL",
    fontSize: 16,
    fontWeight: '700'
  },
});
