import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useQuery, gql} from '@apollo/client';

const GET_CHECKINS = gql`
  {
    check_in {
      id
      comment
      created_at
      image_url
      name
      updated_at
    }
  }
`;

const CheckIn = ({isSelected}) => {
  const {loading, error, data} = useQuery(GET_CHECKINS);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const checkIns = data;

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    const formattedDate = `${day}${getOrdinalSuffix(day)} of ${month} ${year}`;
    return formattedDate;
  }

  function getOrdinalSuffix(day) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const relevantDigits = day % 100;
    const suffix =
      suffixes[(relevantDigits - 20) % 10] ||
      suffixes[relevantDigits] ||
      suffixes[0];
    return `${suffix}`;
  }

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      {checkIns.check_in.map(item => (
        <View key={item.id} style={styles.cardContainer}>
          {item.image_url && (
            <View
              style={{
                width: '100%',
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.image_url}}
                style={{width: '90%', height: '90%', borderRadius: 10}}
                alt={item.image_url}
              />
            </View>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center ',
              width: '90%',
              padding: 2,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="person" size={43} color="grey" />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: '700', color: '#000000', fontSize: 20}}>
                {item.name}
              </Text>
              <Text style={{fontWeight: '400', color: 'blue', fontSize: 18}}>
                {formatDate(item.created_at)}
              </Text>
            </View>
          </View>
          <View style={{width: '90%', marginTop: 10}}>
            <Text style={{color: '#000000', fontSize: 20}}>{item.comment}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    padding: 3,
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: '#000000',
  },
});
export default CheckIn;
