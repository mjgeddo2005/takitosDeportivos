import { View, Text, FlatList, StyleSheet } from 'react-native';
import MonserratRText from '../../components/MonserratRText';
import { colors } from '../../global/colors';

const OrderScreen = ({ route, navigation }) => {
    const cartItems = route.params?.cartItems || [];
    const total = route.params?.total || 0;

    if (cartItems.length === 0) {
        return <Text>No hay productos en este pedido.</Text>;
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <MonserratRText style={styles.itemName}>{item.name}</MonserratRText>
            <MonserratRText>Cantidad: {item.quantity}</MonserratRText>
            <MonserratRText>Precio unitario: ${item.price}</MonserratRText>
            <MonserratRText>Total: ${item.quantity * item.price}</MonserratRText>
        </View>
    );

    return (
        <View style={styles.container}>
            <MonserratRText style={styles.title}>Detalle del Pedido</MonserratRText>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id || item.firebaseId}
                renderItem={renderItem}
            />
            <MonserratRText style={styles.total}>Total del Pedido: ${total}</MonserratRText>
        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:
            colors.blanco
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    itemContainer: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.blanco,
        paddingBottom: 8
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16
    },
});
