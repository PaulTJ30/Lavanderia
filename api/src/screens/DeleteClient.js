import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const URL_clients = "https://157e-2806-2f0-62c1-b7d7-39e2-95e4-bd26-a5fd.ngrok-free.app/clients";

const DeleteClientScreen = () => {
    const [clientId, setClientId] = useState("");
    const navigation = useNavigation();

    const handleDelete = async () => {
        if (!clientId) {
            Alert.alert('Error', "Debes ingresar el ID del cliente.");
            return;
        }

        try {
            await axios.delete(`${URL_clients}/delete/${clientId}`);
            Alert.alert('Éxito', "Cliente eliminado correctamente");
            setClientId('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el cliente.');
            console.error("Error al eliminar cliente:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Eliminar Cliente</Text>
            {/* Botones de navegación */}
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
            <Button title="Eliminar Cliente" onPress={handleDelete} />
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

export default DeleteClientScreen;