import React, {useState} from 'react';

import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AddCheckIn from './Screens/AddCheckIn';
import CheckIn from './Screens/CheckIn';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://profound-marmot-29.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [submitSelect, setSubmitSelect] = useState(true);
  const [checkInSelect, setCheckInSelect] = useState(false);
  return (
    <ApolloProvider client={client}>
      <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'} />
      <SafeAreaView
        style={{width: '100%', height: '100%', backgroundColor: '#f1f1f1'}}>
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: '#000000'}}>
            Checkins
          </Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              setCheckInSelect(false);
              setSubmitSelect(true);
            }}
            style={{
              width: '50%',
              alignItems: 'center',
              borderBottomColor: submitSelect ? '#000000' : '#ffffff',
              borderBottomWidth: submitSelect ? 3 : 0,
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#000000'}}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCheckInSelect(true);
              setSubmitSelect(false);
            }}
            style={{
              alignItems: 'center',
              width: '50%',
              borderBottomColor: checkInSelect ? '#000000' : '#ffffff',
              borderBottomWidth: checkInSelect ? 3 : 0,
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: '#3d4362'}}>
              Check-Ins
            </Text>
          </TouchableOpacity>
        </View>
        {submitSelect ? <AddCheckIn /> : <CheckIn isSelected={checkInSelect} />}
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    backgroundColor: '#ffffff',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    height: '5%',
    backgroundColor: '#ffffff',
  },
});

export default App;
