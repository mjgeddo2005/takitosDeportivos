import { StyleSheet, View, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import { setProductSelected } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import FlatCard from '../../components/FlatCard'
import { colors } from '../../global/colors'
import MonserratRText from '../../components/MonserratRText'

const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [keyword, setKeyword] = useState("");

    const category = useSelector(state => state.shopReducer.categorySelected);

    const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category.toLowerCase());

    const dispatch = useDispatch();

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate("Producto")
    };

    const renderProductsItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectProduct(item)}>
                <FlatCard style={styles.productCard}>
                    <MonserratRText style={styles.title}>{item.title}</MonserratRText>
                    <View style={styles.viewProduct}>
                        <View>
                            <MonserratRText style={styles.price}>Precio : $ {item.price}</MonserratRText>
                            <MonserratRText>Stock: {item.stock}</MonserratRText>
                        </View>
                        <Image width={200} height={120} source={{ uri: item.Image }} resizeMode='contain' />
                    </View>
                </FlatCard>
            </Pressable>
        )
    };

    useEffect(() => {

        if (keyword) {
            const productsFilteredByKeyword = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(keyword.toLocaleLowerCase()))
            setProductsFiltered(productsFilteredByKeyword)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [category, keyword, productsFilteredByCategory])

    return (
        <View >
            <Search setKeyword={setKeyword} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductsItem}
            />
        </View>
    )
};

export default ProductsScreen;

const styles = StyleSheet.create({
    productCard: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.blancoFrio
    },
    viewProduct: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "MonserratL"
    },
    title: {
        fontFamily: "MonserratB",
        fontSize: 16,
    },
    price: {
        fontSize: 18
    }
});