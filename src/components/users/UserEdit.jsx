import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteUser, editUser } from '../../utils/sqliteDb';
import { UserEditSyle } from '../../utils/styles/style';
import Color from '../../utils/styles/colors';

const UserEdit = ({ navigation, route }) => {
    const [id, setId] = useState(route.params.id);
    const [id_ext, setId_ext] = useState(route.params.id_ext);
    const [name, setName] = useState(route.params.name);
    const [userInfo, setUserInfo] = useState(route.params);

    useEffect(() => {
        console.log(userInfo);
    }, []);

    async function handleSave() {
        try {
            var parms = {
                id: id,
                name: name
            };
            console.log('User entered:', parms);
            await editUser(parms);
            navigation.navigate('User');
            
        } catch (error) {
            console.log(`Error saving user ${error}`);
        }
    }
    async function handleDelete() {
        try {
            await deleteUser(userInfo.id);
            navigation.navigate('User');
        } catch (error) {
            console.log(`Error saving user ${error}`);
        }
    }
    const handleNameChange = (text) => {
        setName(text);
    };

    return (
        <View style={UserEditSyle.container}>
            <Text style={UserEditSyle.label}>Enter User Name:</Text>
            <TextInput
                style={UserEditSyle.input}
                onChangeText={handleNameChange}
                value={name}
                placeholder="User name"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Delete" color={Color.red} onPress={handleDelete} />
        </View>
    );
};



export default UserEdit;
