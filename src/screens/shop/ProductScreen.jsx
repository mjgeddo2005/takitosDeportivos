import { StyleSheet, Text, Pressable, Image, ScrollView, useWindowDimensions, Alert } from 'react-native'
import { colors } from '../../global/colors'
import { useSelector } from 'react-redux'
import MonserratRText from '../../components/MonserratRText'
import { useAddToCartMutation } from '../../services/cartApi';

const ProductScreen = () => {
    const product = useSelector(state => state.shopReducer.productSelected)
    const { width } = useWindowDimensions()
    const { localId } = useSelector(state => state.userReducer);
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        if (!localId) return;

        const productToSend = {
            id: product.id,
            brand: product.brand,
            title: product.title,
            price: product.price,
            image: product.Image,
            quantity: 1
        };
        try {
            await addToCart({
                userId: localId,
                product: productToSend
            }).unwrap();
        } catch (error) {
            console.log("Error agregando al carrito:", error);
        }
    };
    return (
        <ScrollView style={styles.productContainer}>
            <MonserratRText style={styles.textBrand}>{product.brand}</MonserratRText>
            <MonserratRText style={styles.textTitle}>{product.title}</MonserratRText>
            <Image
                source={{ uri: product.Image }}
                alt={product.title}
                width='100%'
                height={width * .6}
                resizeMode='contain'
            />
            <Text style={styles.longDescription}>{product.longDescription}</Text>
            <Text style={styles.price}>Precio: ${product.price}</Text>
            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                onPress={handleAddToCart}
                disabled={isLoading}
            >
                <MonserratRText style={styles.textAddToCart}> {isLoading ? "Agregando..." : "Agregar al carrito"}</MonserratRText>
            </Pressable>
        </ScrollView>
    )
};

export default ProductScreen;

const styles = StyleSheet.create({
    productContainer: {
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    textBrand: {
        color: colors.grisOscuro,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700'
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.terracota,
        borderRadius: 16,
        marginVertical: 16,
        marginBottom: 0
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 18,
        textAlign: 'center',
    }
});
