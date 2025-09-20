import { FlatList, StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { colors } from '../../global/colors';
import FlatCard from '../../components/FlatCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import MonserratRText from '../../components/MonserratRText';
import {useGetCartByUserQuery,useRemoveFromCartMutation,useAddToCartMutation} from '../../services/cartApi';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const { localId } = useSelector(state => state.userReducer);
  const { data: cartItems = [], isLoading, isError } = useGetCartByUserQuery(localId, {
    skip: !localId,
  });

  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCart] = useAddToCartMutation();

  const total = cartItems.reduce((acc, item) => acc + ((item.quantity || 0) * item.price), 0);

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;
    try {
      await updateCart({
        userId: localId,
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.Image,
          quantity: item.quantity - 1
        }
      }).unwrap();
    } catch (error) {
      console.log("Error actualizando carrito:", error);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await updateCart({
        userId: localId,
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.Image,
          quantity: item.quantity + 1
        }
      }).unwrap();
    } catch (error) {
      console.log("Error actualizando carrito:", error);
    }
  };

  const handleRemove = (item) => {
    Alert.alert(
      "Eliminar producto",
      "¿Deseas eliminar este producto del carrito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await removeFromCart({ userId: localId, firebaseId: item.firebaseId }).unwrap();
            } catch (error) {
              console.log("Error eliminando producto:", error);
            }
          }
        }
      ]
    );
  };

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total}</Text>
      <Pressable style={styles.confirmButton} onPress={() => navigation.navigate('Pedidos', { cartItems, total })}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </Pressable>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <Image source={{ uri: item.Image }} style={styles.cartImage} resizeMode='cover' />
      <View style={styles.cartDescription}>
        <MonserratRText style={styles.title}>{item.name}</MonserratRText>
        <MonserratRText style={styles.price}>Precio unitario: $ {item.price}</MonserratRText>

        <View style={styles.quantityContainer}>
          <MonserratRText>Cantidad: </MonserratRText>
          <Pressable onPress={() => handleDecrease(item)}>
            <Icon name="minus-circle-outline" style={[styles.quantityIcon, item.quantity <= 1 && { color: colors.gris }]} />
          </Pressable>
          <MonserratRText>{String(item.quantity || 1).padStart(2, "0")}</MonserratRText>
          <Pressable onPress={() => handleIncrease(item)}>
            <Icon name="plus-circle-outline" style={styles.quantityIcon} />
          </Pressable>
        </View>

        <MonserratRText style={styles.total}>Total: $ {(item.quantity || 1) * item.price}</MonserratRText>
        <Pressable onPress={() => handleRemove(item)}>
          <Icon name="delete" size={36} color={colors.red} style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  );

  if (isLoading) return <MonserratRText>Cargando carrito...</MonserratRText>;
  if (isError) return <MonserratRText>Error cargando carrito</MonserratRText>;
  if (cartItems.length === 0) return <MonserratRText>Tu carrito está vacío</MonserratRText>;

  return (
    <FlatList
      data={cartItems}
      keyExtractor={item => item.id || item.firebaseId}
      renderItem={renderCartItem}
      ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
      ListFooterComponent={<FooterComponent />}
    />
  );
};

export default CartScreen;





const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 80,
    height: 80
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.terracota,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700'
  },
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

  },
  quantity: {
    fontSize: 20,
    alignItems: "center"
  },
  quantityIcon: {
    color: colors.celeste,
    fontSize: 24,
  }


})