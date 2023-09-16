import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteUser } from '../../utils/sqliteDb';
import Style from '../../utils/styles/style';
import Color from '../../utils/styles/colors';

const UserEdit = ({ navigation, route }) => {
    const [userInfo, setUserInfo] = useState(route.params);

    useEffect(() => {
        console.log(userInfo);
    }, []);

    async function handleSave(parms) {
      try {

      } catch (error) {
          console.log(`Error saving user ${error}`);
      }
    }
    async function handleDelete() {
      try {
        await deleteUser(userInfo.id);
        
      } catch (error) {
          console.log(`Error saving user ${error}`);
      }
    }

    return (
        <View style={Style.container}>
            <Text style={Style.label}>Enter Your Name:</Text>
            <TextInput
                style={Style.input}
                //onChangeText={handleNameChange}
                value={userInfo.name}
                placeholder="Your name"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Delete" color={Color.red} onPress={handleDelete} />
        </View>
    );
};



export default UserEdit;
