import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'
import { useNavigation } from '@react-navigation/core';


const URL_users = "/users"
const LoginUsers = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Te faltan datos rey")
            return
        }
        try {
            const payload = {
                email: String(email),
                password: String(password)
            }
            console.log("Datos a enviar:", payload)

            const res = await axios.post(`${URL_users}/login`, payload, {
                headers: { 'Content-Type': 'applications/json' }
            });

            Alert.alert('Eso mi perrillo', res.data.msg)
            setEmail('')
            setPassword('')
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear el usuario');
            console.log("Error al crear usuarios", error)

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Crea Un Usuario
                </Text>
                <Button title="Clientes" onPress={() => navigation.navigate('Registrar Cliente')} />
                <Button title="Actualizar Cliente" onPress={() => navigation.navigate('Actualizar Usuario')} />

                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Constraseña"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <Button title='Inicia Sesion' onPress={handleSubmit} />
                <Button title='Aun no tienes cuenta?' onPress={() => navigation.navigate('Crear Usuario')} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 14,
        backgroundColor: '#fff',
        fontSize: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 12,
    },
});

export default LoginUsers;
