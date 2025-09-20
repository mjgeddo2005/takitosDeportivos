import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch, Alert } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { saveSession, clearSession } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.8

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)
    const [triggerLogin, result] = useLoginMutation()
    const [isFocused, setIsFocused] = useState({ psswd: false, email: false });

    const dispatch = useDispatch()

    const onsubmit = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Formato de correo invalido", "Por favor ingresa un email valido.");
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password.trim())) {
            Alert.alert(
                "Contraseña inválida",
                "La contraseña debe tener al menos 6 caracteres, una letra mayuscula, una letra minuscula y un numero."
            );
            return;
        }

        triggerLogin({ email, password })
    }

    useEffect(() => {
        (async () => {
            if (result.status === "fulfilled") {
                try {
                    if (persistSession) {
                        await saveSession(result.data.localId, result.data.email);
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    } else {
                        await clearSession();
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    }

                } catch (error) {
                    console.log("Error al guardar sesión:", error);
                }
            }
        })()
    }, [result])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Takitos Deportivos</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.textInput,
                        isFocused.email ? styles.focusedInput : styles.unfocusedInput,
                    ]}
                    onFocus={() => setIsFocused(prevState => ({ ...prevState, email: true }))}
                    onBlur={() => setIsFocused(prevState => ({ ...prevState, email: false }))}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.white}
                    placeholder="Email"

                />
                <TextInput
                    style={[
                        styles.textInput,
                        isFocused.psswd ? styles.focusedInput : styles.unfocusedInput,
                    ]}
                    onFocus={() => setIsFocused(prevState => ({ ...prevState, psswd: true }))}
                    onBlur={() => setIsFocused(prevState => ({ ...prevState, psswd: false }))}
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.white}
                    placeholder='Password'

                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
            <View style={styles.rememberMe}>
                <Text style={{ color: colors.white }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
        </View>
    )
}

export default LoginScreen

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
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
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
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    }
})