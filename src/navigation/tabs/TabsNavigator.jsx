import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shop/ShopStackNavigator';
import CartStackNavigator from '../cart/CartStackNavigator';
import ProfileStackNavigator from '../profile/ProfileStackNavigator';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../global/colors';
import { useSelector } from 'react-redux';
import { useGetCartByUserQuery } from '../../services/cartApi';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    const { localId } = useSelector(state => state.userReducer);
    const { data: cartItems = [], isLoading, isError } = useGetCartByUserQuery(localId, {
        skip: !localId,
    });

    const quantity = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const hasOrders = cartItems.length > 0; // Aquí definís si hay pedidos

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="shopping-bag" size={24} color={focused ? colors.hover : colors.botones} />
                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="shopping-cart" size={24} color={focused ? colors.hover : colors.botones} />
                    ),
                    tabBarBadge: quantity > 0 ? quantity : null
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="user" size={24} color={focused ? colors.hover : colors.botones} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default TabsNavigator;

