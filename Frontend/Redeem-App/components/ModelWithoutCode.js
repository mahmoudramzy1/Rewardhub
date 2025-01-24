    // ModalRedeemWithoutCode.js

    import React, { useState } from 'react';
    import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

    const ModalRedeemWithoutCode = ({ visible, onClose, onRedeemWithoutCode, loading }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [points, setPoints] = useState('');

    const handleRedeem = async () => {
        if (!phoneNumber || !points) {
        alert('Please enter both phone number and points.');
        return;
        }

        // Call the redeem handler passed as a prop
        await onRedeemWithoutCode(phoneNumber, points);
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
            <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            />
            <TextInput
            style={styles.input}
            placeholder="Enter Points"
            value={points}
            onChangeText={setPoints}
            keyboardType="numeric"
            />
            {loading ? (
            <ActivityIndicator size="large" color="#4caf50" />
            ) : (
            <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
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
    input: {
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

    export default ModalRedeemWithoutCode;
