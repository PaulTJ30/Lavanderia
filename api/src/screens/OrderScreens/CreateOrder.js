import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const URL_orders = "https://157e-2806-2f0-62c1-b7d7-39e2-95e4-bd26-a5fd.ngrok-free.app/orders";
const CreateOrder = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async () => {
        if (!client_id || !user_id || !total_price) {
            Alert.alert('Error', "Te faltaron datos papito");
            return;
        }

        try {
            const payload = {

                client_id: String(client_id),
                user_id: String(user_id),
                total_price: String(total_price)

            };

            console.log("Datos a enviar:", payload);

            // Enviar datos correctamente
            const res = await axios.post(`${URL_orders}/create`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            Alert.alert('Esooo', res.data.msg);
            setclient_id('');
            setuser_id('');
            settotal_price('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear la orden');
            console.error("Error al crear la orden:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>

                <Button title="Usuarios" onPress={() => navigation.navigate('Crear Usuario')} />
                <Button title="Registrar Cliente" onPress={() => navigation.navigate('Registrar Cliente')} />
                <Button title="Buscar por Nombre" onPress={() => navigation.navigate('Buscar por Nombre')} />
                <Button title="Buscar por Teléfono" onPress={() => navigation.navigate('Buscar por Teléfono')} />
                <Button title="Actualizar Cliente" onPress={() => navigation.navigate('Actualizar Cliente')} />
                <Button title="Eliminar Cliente" onPress={() => navigation.navigate('Eliminar Cliente')} />


                <Text style={styles.title}>Registrar Cliente</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={phone_number}
                    onChangeText={text => setPhone(text)}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Button title="Registrate" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

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

export default CreateOrder;