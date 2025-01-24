import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axiosInstance from './TokenMangement';
import { useNavigation } from '@react-navigation/native';
import ModalCode from './ModalCode';
import ModalRedeemWithoutCode from './ModelWithoutCode';


export default function Home() {
    const [isScanning, setIsScanning] = useState(false);  // State to control scanner visibility
    const [scannedData, setScannedData] = useState(null);  // To store scanned QR code data
    const [showModal, setShowModal] = useState(false); // Modal state for input
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [marketName, setMarketName] = useState('');
    // const [codeInput, setCodeInput] = useState(''); // Store input code
    const [username, setUsername] = useState(''); 
    const [points, setPoints] = useState(); 
    const [marketPoints, setMarketPoints] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
        const [transactions, setTransactions] = useState([]);
    const navigation = useNavigation();

  useEffect(() => {
      if (activeTab === 'home') {
      fetchMarketData();
      }
      else if (activeTab === 'transactions') {
        fetchTransactions();
      }
    }, [activeTab])


  const fetchMarketData = async () => {
    setLoading(true);
    try {
      console.log('Fetching market data...');
      const response = await axiosInstance.get('/thirdparty/thirdparty');
      const market = response.data;
      console.log('Market Data:', market);
      setMarketName(market.username);
      setMarketPoints(market.points);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch market data.');
    } finally {
      setLoading(false);
    }
  };
  const fetchTransactions = async () => {
    setLoading(true);
    try {
        const data = await axiosInstance.get(`/thirdparty/transactions`);

        setTransactions(data.data);
        console.log(data.data);
    } catch (error) {
        Alert.alert('Error', 'Failed to fetch transactions.');
    } finally {
        setLoading(false);
    }
};
const renderTransaction = ({ item }) => {
    const transactionDate = new Date(item.date);
    const formattedDate = transactionDate.toLocaleDateString(); // Display only date (e.g., 2025-01-05)
    const formattedTime = transactionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Display only hours and minutes (e.g., 10:30 AM)
    const pointsStyle = item.type === 'added' ? styles.addedPoints : styles.deductedPoints;

    return (
    <View style={styles.transactionCard}>
        <Text style={styles.transactionText}>Date: {formattedDate}</Text>
        <Text style={styles.transactionText}>Time: {formattedTime}</Text>
        <Text style={styles.transactionText}>{item.user}</Text>
        <Text style={[styles.transactionPoints, pointsStyle]}>
            {item.type === 'added' ? `+${item.points}` : `${item.points}`} Point
        </Text>
        <Text style={styles.transactionText}>Type: {item.type}</Text>
        <Text style={styles.transactionText}>{item.description}</Text>
        
    </View>
)};

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          try {
            navigation.navigate('Login');
            Alert.alert('Signed Out', 'You have been logged out successfully.');
          } catch (error) {
            Alert.alert('Error', 'Failed to log out.');
          }
        },
      },
    ]);
  };

    const handleRedeemWithCode = async (codeInput) => {
        setLoading(true);
        console.log('Redeeming offer with code:');
        try {
        const response = await axiosInstance.post('/thirdparty/redeem-offer', {
            code: codeInput,
        });
        console.log('Redeem Response:', response);
        if (response.status === 200) {
            Alert.alert('Offer Redeemed', `Code: ${response.data.message}`);
            setShowModal(false); // Close the modal after successful redemption
        } else {
            Alert.alert('Error', 'Failed to redeem offer.');
        }
        } catch (error) {
        Alert.alert('Error', 'Failed to redeem offer.');
        } finally {
        setLoading(false);
        }
    };
    


 // Handler for Redeeming Offer Without QR Code
 const handleRedeemWithoutQRCode = async (phoneNumber, points) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/market-app/redeem-offer-without-code', {
        phoneNumber,
        points,
      });
      if (response.status === 200 && response.data.code) {
        Alert.alert('Offer Redeemed', `Offer redeemed successfully. Code: ${response.data.code}`);
        setShowRedeemModal(false); // Close modal after successful redemption
      } else {
        Alert.alert('Error', 'Failed to redeem offer.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to redeem offer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <Image source={require('../assets/rewardhup-logo-resized.png')} style={styles.logo} />
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Market Info Section */}
            { loading ? (
                <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />
            ) : (
                <>
                    {activeTab === 'home' && (
                        <>
                            <View style={styles.pointsSection}>
                                <Text style={styles.helloText}>{marketName}</Text>  
                                <Text style={styles.pointsText}>Points: {marketPoints}</Text>
                            </View>
                             {/* Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                style={styles.redeemButton}
                                onPress={() => setShowModal(true)} // Open modal to input code
                                >
                                <Text style={styles.buttonText}>Redeem Offer by Code</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    style={styles.redeemButton}
                                    onPress={() => setShowRedeemModal(true)} // Open modal to input phone number and points
                                >
                                    <Text style={styles.buttonText}>Redeem Offer Without Code</Text>
                                </TouchableOpacity> */}
                            </View>
                            
                        </>
                    )}
                    {activeTab === 'transactions' && (
                        <View style={styles.transactionsSection}>
                            <Text style={styles.transactionsHeading}>Transactions</Text>
                            <FlatList
                                data={transactions}
                                keyExtractor={(item) => item._id}
                                renderItem={renderTransaction}
                                contentContainerStyle={styles.list}
                            />
                        </View>
                    )}
                </>
            )}

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setActiveTab('home')}
          style={styles.footerButton}
        >
          <Icon
            name="home"
            size={24}
            color={activeTab === 'home' ? '#4caf50' : '#999'}
          />
          <Text
            style={[
              styles.footerText,
              activeTab === 'home' && styles.activeText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('transactions')}
          style={styles.footerButton}
        >
          <Icon
            name="receipt"
            size={24}
            color={activeTab === 'transactions' ? '#4caf50' : '#999'}
          />
          <Text
            style={[
              styles.footerText,
              activeTab === 'transactions' && styles.activeText,
            ]}
          >
            Transactions
          </Text>
        </TouchableOpacity>
        </View>
        {/* Modal Component */}
        <ModalCode 
            visible={showModal} 
            onClose={() => setShowModal(false)} // Close modal
            onRedeem={handleRedeemWithCode} // Pass redeem handler
            loading={loading} // Show loading spinner if redeeming
        />
              {/* Modal Component for Redeeming Offer Without Code */}
        <ModalRedeemWithoutCode
            visible={showRedeemModal}
            onClose={() => setShowRedeemModal(false)} // Close modal
            onRedeemWithoutCode={handleRedeemWithoutQRCode} // Pass redeem handler
            loading={loading} // Show loading spinner if redeeming
        />
        </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent:'space-between',
    backgroundColor: '#fff',
    paddingTop: 50,
},
header: {
    backgroundColor: '#181C14',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
logo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
},
pointsSection: {
    display:'flex',
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"space-around",
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
},
helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181C14',
},
pointsText: {
    fontSize: 18,
    color: '#181C14',
},
marketInfoSection: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
},
marketNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 10,
},
marketPointsText: {
    fontSize: 18,
    color: '#4caf50',
    marginBottom: 20,
},
buttonContainer: {
    flexDirection:"col",
    justifyContent: 'space-around',
    alignItems:'center',
    gap:10,
},
redeemButton: {
    backgroundColor: '#181C14',
    padding: 40,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 0,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

},
footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#181C14',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
},
footerButton: {
    alignItems: 'center',
},
footerText: {
    fontSize: 12,
    color: '#999',
},
activeText: {
    color: '#fff',
    fontWeight: 'bold',
},
loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
transactionsSection: {
    flex: 1,
    padding: 20,
},
transactionsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
},
transactionCard: {
    backgroundColor: '#f9f9f9',
    display:'flex',
    alignItems:'center',
    justifyContent:"center",
    flexDirection:"column",
    gap:'10px',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
},
transactionText: { fontSize: 16 },
transactionPoints: { fontSize: 16, fontWeight: 'bold', color: '#4caf50' },
scannerText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
},
cancelButton: {
    backgroundColor: '#181C14',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
},
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
