import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const URL_clients = "https://157e-2806-2f0-62c1-b7d7-39e2-95e4-bd26-a5fd.ngrok-free.app/clients";

const SearchClientByPhoneScreen = () => {
    const [phone, setPhone] = useState("");
    const [client, setClient] = useState(null);
const navigation = useNavigation();

    const handleSearch = async () => {
        if (!phone) {
            Alert.alert('Error', "Debes ingresar un número de teléfono.");
            return;
        }

        try {
            const res = await axios.get(`${URL_clients}/search/phone?phone=${phone}`);
            setClient(res.data);
        } catch (error) {
            Alert.alert('Error', 'No se encontró el cliente.');
            console.error("Error en la búsqueda:", error);
            setClient(null);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Buscar Cliente por Teléfono</Text>
            {/* Botones de navegación */}
            <Button title="Buscar por Nombre" onPress={() => navigation.navigate('Buscar por Nombre')} />
            <Button title="Buscar por Teléfono" onPress={() => navigation.navigate('Buscar por Teléfono')} />
            <Button title="Actualizar Cliente" onPress={() => navigation.navigate('Actualizar Cliente')} />
            <Button title="Eliminar Cliente" onPress={() => navigation.navigate('Eliminar Cliente')} />

            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
            />
            <Button title="Buscar" onPress={handleSearch} />

            {client ? (
                <View style={styles.clientCard}>
                    <Text style={styles.clientText}>📌 {client.name}</Text>
                    <Text>📞 {client.phone_number}</Text>
                    <Text>📍 {client.address}</Text>
                </View>
            ) : (
                <Text style={styles.noResults}>No se encontraron resultados.</Text>
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
        marginTop: 10,
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

export default SearchClientByPhoneScreen;