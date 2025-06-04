import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar todas las pantallas
import CreateClientScreen from './screens/CreateClientScreen.js';
import SearchClientByNameScreen from './screens/SearchClientByName.js';
import SearchClientByPhoneScreen from './screens/SearchClientByPhone.js';
import UpdateClientScreen from './screens/UpdateClient.js';
import DeleteClientScreen from './screens/DeleteClient.js';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Registrar Cliente" component={CreateClientScreen} />
                <Stack.Screen name="Buscar por Nombre" component={SearchClientByNameScreen} />
                <Stack.Screen name="Buscar por Teléfono" component={SearchClientByPhoneScreen} />
                <Stack.Screen name="Actualizar Cliente" component={UpdateClientScreen} />
                <Stack.Screen name="Eliminar Cliente" component={DeleteClientScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}