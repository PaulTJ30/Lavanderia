import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import axios from 'axios';

const API_URL = '';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const fetchServices = async () => {
    try {
      const res = await axios.get(API_URL);
      setServices(res.data);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  };

  const resetForm = () => {
    setDescription('');
    setType('');
    setEditingService(null);
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setDescription(service.descripcion);
      setType(service.tipo);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const saveService = async () => {
    try {
      if (!description || !type) {
        Alert.alert('Campos requeridos', 'Completa todos los campos');
        return;
      }

      if (editingService) {
        await axios.put(`${API_URL}/${editingService.id}`, {
          descripcion: description,
          tipo: type,
        });
      } else {
        await axios.post(API_URL, {
          descripcion: description,
          tipo: type,
        });
      }

      fetchServices();
      closeModal();
    } catch (error) {
      console.error('Error al guardar servicio:', error);
    }
  };

  const deleteService = (id) => {
    Alert.alert('Confirmar', '¿Deseas eliminar este servicio?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            fetchServices();
          } catch (error) {
            console.error('Error al eliminar servicio:', error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Servicios</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay servicios registrados.</Text>}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceText}>{item.descripcion}</Text>
              <Text style={styles.serviceType}>Tipo: {item.tipo}</Text>
            </View>
            <TouchableOpacity onPress={() => openModal(item)} style={styles.editButton}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteService(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>+ Nuevo Servicio</Text>
      </TouchableOpacity>

      {/* Modal para crear/editar servicio */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
            </Text>
            <TextInput
              placeholder="Descripción"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <TextInput
              placeholder="Tipo de Servicio"
              value={type}
              onChangeText={setType}
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveService}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ServiceManager;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  serviceType: {
    fontSize: 14,
    color: '#555',
  },
  editButton: {
    backgroundColor: 'teal',
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});