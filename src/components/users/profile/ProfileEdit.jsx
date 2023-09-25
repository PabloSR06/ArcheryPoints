import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteUser, editUser } from '../../../utils/sqliteDb';
import { UserEditSyle } from '../../../utils/styles/style';
import Color from '../../../utils/styles/colors';

const ProfileEdit = ({ navigation, route }) => {
    const [id, setId] = useState(route.params.id);
    const [extId, setExtId] = useState(route.params.id_ext);
    const [name, setName] = useState(route.params.name);
    const [userInfo, setUserInfo] = useState(route.params);

    useEffect(() => {

    }, []);

    async function handleSave() {
        try {
            var parms = {
                id: id,
                name: name,
                extId: extId
            };
            await editUser(parms);
            navigation.replace('User');

        } catch (error) {
            console.log(`Error saving user ${error}`);
        }
    }

    const handleNameChange = (text) => {
        setName(text);
    };
    const handleExtIdChange = (text) => {
        setExtId(text);
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
            <Text style={UserEditSyle.label}>Identificador externo:</Text>

            <TextInput
                style={UserEditSyle.input}
                onChangeText={handleExtIdChange}
                value={extId}
                placeholder="External Id"
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};


export default ProfileEdit;
