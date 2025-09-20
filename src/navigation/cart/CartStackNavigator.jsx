import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../../screens";
import Header from "../../components/Header";
import {OrderScreen} from "../../screens";

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Carrito"
            screenOptions={{
                header: ({ route }) => (<Header title="Takitos Deportivos" subtitle={route.name} />)
            }}
        >
            <Stack.Screen name="Carrito" component={CartScreen} />
            <Stack.Screen name="Pedidos" component={OrderScreen} />
        </Stack.Navigator>
    )
}

export default CartStackNavigator