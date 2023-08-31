import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, gql} from '@apollo/client';

const CHECK_IN_ONE = gql`
  mutation MyMutation($check_in: check_in_insert_input!) {
    insert_check_in_one(object: $check_in) {
      id
      name
      comment
      image_url
    }
  }
`;
const AddCheckIn = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [createCheckIn] = useMutation(CHECK_IN_ONE);
  function getRandomInt(min, max) {
    min = Math.ceil(min); // Ensure minimum is inclusive
    max = Math.floor(max); // Ensure maximum is exclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleAdd = async e => {
    setLoading(true);
    const uuid = getRandomInt(1, 1000);
    if (name && comment) {
      try {
        const {data} = await createCheckIn({
          variables: {
            check_in: {
              id: uuid,
              name: name,
              comment: comment,
              image_url: imageUrl ? imageUrl : '',
            },
          },
        });
        setLoading(false);
        console.log('New Checkin:', data.insert_check_in_one);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      setName('');
      setComment('');
      setImageUrl('');
    } else {
      Alert.alert('please fill the form');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Text>Adding....</Text>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={name}
            onChangeText={e => {
              setName(e);
            }}
          />
          <TextInput
            placeholder="Comment"
            value={comment}
            style={styles.textInput}
            onChangeText={e => {
              setComment(e);
            }}
          />
          <TextInput
            placeholder="ImageUrl"
            value={imageUrl}
            style={styles.textInput}
            onChangeText={e => {
              setImageUrl(e);
            }}
          />
          <TouchableOpacity style={styles.button} onPress={e => handleAdd(e)}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>ADD</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  textInput: {
    height: 55,
    width: '90%',
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 0.2,
    padding: 15,
    marginBottom: 10,
  },
  button: {
    height: 55,
    width: '90%',
    backgroundColor: '#4229df',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default AddCheckIn;
