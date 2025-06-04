import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const URL_clients = "https://157e-2806-2f0-62c1-b7d7-39e2-95e4-bd26-a5fd.ngrok-free.app/clients";

const SearchClientByNameScreen = () => {
    const [name, setName] = useState("");
    const [clients, setClients] = useState([]);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (!name) {
            Alert.alert('Error', "Debes ingresar un nombre.");
            return;
        }

        try {
            const res = await axios.get(`${URL_clients}/search/name?name=${name}`);
            setClients(res.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo encontrar clientes.');
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Buscar Cliente por Nombre</Text>
            {/* Botones de navegación */}
            <Button title="Buscar por Nombre" onPress={() => navigation.navigate('Buscar por Nombre')} />
            <Button title="Buscar por Teléfono" onPress={() => navigation.navigate('Buscar por Teléfono')} />
            <Button title="Actualizar Cliente" onPress={() => navigation.navigate('Actualizar Cliente')} />
            <Button title="Eliminar Cliente" onPress={() => navigation.navigate('Eliminar Cliente')} />

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={text => setName(text)}
            />
            <Button title="Buscar" onPress={handleSearch} />

            {clients.length > 0 ? (
                clients.map((client, index) => (
                    <View key={index} style={styles.clientCard}>
                        <Text style={styles.clientText}>📌 {client.name}</Text>
                        <Text>📞 {client.phone_number}</Text>
                        <Text>📍 {client.address}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noResults}>No se encontraron clientes.</Text>
            )}
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
    clientCard: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    clientText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    noResults: {
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});

export default SearchClientByNameScreen;