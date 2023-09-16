import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllUsers, getDbConnection, getUsers } from '../../utils/sqliteDb';
import { generateExtId } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

const UserList = ({ navigation }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers() {
        try {
            var list = await getAllUsers();
            setList(list);
        } catch (error) {
            console.log(`Error loading users ${error}`);
        }
    }

    const renderUserList = ({ item }) => {       
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EditUser', item)} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('NewUser')} >
                <Icon name="person-add-outline" size={26} />
            </TouchableOpacity>
            <Text>List of Names:</Text>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                // renderItem={({ item }) => <Text>{item.name}</Text>}
                renderItem={renderUserList}

            />
        </View>
    );
};

export default UserList;
