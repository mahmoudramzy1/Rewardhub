    // ModalInput.js

    import React, { useState } from 'react';
    import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
    import axiosInstance from './TokenMangement';

    const ModalCode = ({ visible, onClose, onRedeem, loading }) => {
    const [codeInput, setCodeInput] = useState('');

        const handleRedeemWithCode = async () => {
            if (codeInput.trim() === '') {
            alert('Please enter a code.');
            return;
            }

            await onRedeem(codeInput); // Call the redeem handler passed as a prop
        };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
            <TextInput
            style={styles.codeInput}
            placeholder="Enter Offer Code"
            value={codeInput}
            onChangeText={setCodeInput}
            />
            {loading ? (
            <ActivityIndicator size="large" color="#4caf50" />
            ) : (
            <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemWithCode}>
                <Text style={styles.buttonText}>Redeem Offer</Text>
            </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    );
    };

    const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    codeInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        width: '80%',
        marginBottom: 20,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: '#181C14',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    redeemButton: {
        backgroundColor: '#181C14',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    });

    export default ModalCode;
