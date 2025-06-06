import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CreateClient from './screens/ClientsScreens/CreateClient.js';
import SearchClientByName from './screens/ClientsScreens/SearchClientByName.js';
import SearchClientByPhone from './screens/ClientsScreens/SearchClientByPhone.js';
import UpdateClient from './screens/ClientsScreens/UpdateClient.js';
import DeleteClient from './screens/ClientsScreens/DeleteClient.js';
import CreateUser from './screens/UsersScreens/CreateUser.js';
import LoginUsers from './screens/UsersScreens/LoginUser.js';
import UpdateUser from './screens/UsersScreens/UpdateUser.js';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Registrar Cliente" component={CreateClient} />
                <Stack.Screen name="Buscar por Nombre" component={SearchClientByName} />
                <Stack.Screen name="Buscar por Teléfono" component={SearchClientByPhone} />
                <Stack.Screen name="Actualizar Cliente" component={UpdateClient} />
                <Stack.Screen name="Eliminar Cliente" component={DeleteClient} />
                <Stack.Screen name="Crear Usuario" component={CreateUser} />
                <Stack.Screen name="Iniciar Sesion" component={LoginUsers} />
                <Stack.Screen name="Actualizar Usuario" component={UpdateUser} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


