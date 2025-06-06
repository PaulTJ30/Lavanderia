import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const URL_clients = "https://157e-2806-2f0-62c1-b7d7-39e2-95e4-bd26-a5fd.ngrok-free.app/clients";

const UpdateClient = () => {
    const [clientId, setClientId] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation();

    const handleUpdate = async () => {
        if (!clientId || !name || !phone_number || !address) {
            Alert.alert('Error', "Todos los campos son obligatorios.");
            return;
        }

        try {
            const payload = { name, phone_number, address };
            await axios.put(`${URL_clients}/update/${clientId}`, payload);

            Alert.alert('Éxito', "Cliente actualizado correctamente");
            setClientId('');
            setName('');
            setPhone('');
            setAddress('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el cliente.');
            console.error("Error en la actualización:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Cliente</Text>

            <Button title="Usuarios" onPress={() => navigation.navigate('Crear Usuario')} />

            <Button title="Buscar por Nombre" onPress={() => navigation.navigate('Buscar por Nombre')} />
            <Button title="Buscar por Teléfono" onPress={() => navigation.navigate('Buscar por Teléfono')} />
            <Button title="Actualizar Cliente" onPress={() => navigation.navigate('Actualizar Cliente')} />
            <Button title="Eliminar Cliente" onPress={() => navigation.navigate('Eliminar Cliente')} />

            <TextInput
                style={styles.input}
                placeholder="ID del Cliente"
                value={clientId}
                onChangeText={text => setClientId(text)}
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
                placeholder="Nuevo Teléfono"
                value={phone_number}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva Dirección"
                value={address}
                onChangeText={text => setAddress(text)}
            />

            <Button title="Actualizar Cliente" onPress={handleUpdate} />
        </ScrollView>
    );
};

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

export default UpdateClient;