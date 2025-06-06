import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const URL_users = "/users"

const UpdateUser = () => {
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigation = useNavigation();

    const handleUpdate = async () => {
        if (!userId || !name || !email || !password) {
            Alert.alert('Error', "Todos los campos son obligatorios")
            return
        }
        try {
            const payload = { name, email, password }
            await axios.put(`${URL_users}/update/${userId}`, payload)

            Alert.alert("Exito", "Usuario actualizado con exito")
            setUserId()
            setName()
            setEmail()
            setPassword()
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el usuario.');
            console.error("Error en la actualización:", error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Clientes" onPress={() => navigation.navigate('Registrar Cliente')} />
            <Button title='Inicia Sesion' onPress={() => navigation.navigate('Iniciar Sesion')} />
            <Button title='Crear Usuarios' onPress={() => navigation.navigate('Crear Usuario')} />


            <Text style={styles.title}>Actualizar Cliente</Text>


            <TextInput
                style={styles.input}
                placeholder="ID del Usuario"
                value={userId}
                onChangeText={text => setUserId(text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nuevo Nombre"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nuevo Email"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
            />

            <Button title="Actualizar Usuario" onPress={handleUpdate} />
            <Button title="Cerrar Sesion" />
            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
});

export default UpdateUser
