import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
};

export default FlatCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.blanco,
        padding: 32,
        margin: 8,
        elevation: 10,
        borderColor: colors.botones,
        borderWidth: 1,
        borderEndEndRadius: 10,
        borderStartEndRadius: 10,
    }
});


