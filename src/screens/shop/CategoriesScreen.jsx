import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
//import categories from '../../data/categories.json'
import FlatCard from '../../components/FlatCard';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopApi';
import { colors } from '../../global/colors';
import MonserratRText from '../../components/MonserratRText';

const CategoriesScreen = ({ navigation }) => {

    //const categories = useSelector(state=>state.shopReducer.categories)
    const { data: categories, isLoading, error } = useGetCategoriesQuery()

    //console.log("Categories desde firebase",cateogires, isLoading,error )

    const dispatch = useDispatch()

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        //console.log(item)
        return (
            <Pressable onPress={() => handleSelectCategory(item.title)}>
                <FlatCard style={styles.cardCustom}>
                    <MonserratRText style={styles.title}>{item.title}</MonserratRText>
                    <Image width={200} height={120} source={{ uri: item.image }} resizeMode='contain' />
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    cardCustom: {
        backgroundColor: colors.blancoFrio,
    },
    title: {
        fontWeight: 600,
        fontSize: 24
    }
})