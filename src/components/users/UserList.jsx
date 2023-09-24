import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllUsers, getDbConnection, getUsers } from '../../utils/sqliteDb';
import { generateExtId } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserListStyle } from '../../utils/styles/style';
import { Button } from 'react-native-elements';

const UserList = ({ navigation, route }) => {
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
                <View style={UserListStyle.userContainer}>
                    <Text style={UserListStyle.userName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={UserListStyle.container}>

            <Text style={UserListStyle.listTitle}>List of Names:</Text>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUserList}
            />
            <Button icon={() => <Icon name="person-add-outline" size={20} color="white" />} title="New User" onPress={() => navigation.navigate('NewUser')}/>
        </View>
    );
};


export default UserList;
