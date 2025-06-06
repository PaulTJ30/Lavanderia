import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'
import { useNavigation } from '@react-navigation/core';


const URL_users = "/users"
const CreateUser = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Te faltan datos rey")
            return
        }
        try {
            const payload = {
                name: String(name),
                email: String(email),
                password: String(password)
            }
            console.log("Datos a enviar:", payload)

            const res = await axios.post(`${URL_users}/register`, payload, {
                headers: { 'Content-Type': 'applications/json' }
            });

            Alert.alert('Eso mi perrillo', res.data.msg)
            setName('')
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

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                />
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

                <Button title='Registrate' onPress={handleSubmit} />
                <Button title='Inicia Sesion' onPress={() => navigation.navigate('Iniciar Sesion')} />
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
        // elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: 12,
    },
});

export default CreateUser;
