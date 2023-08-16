import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllUsers, getDbConnection, getUsers } from '../../utils/sqliteDb';;

const UserList = () => {
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

    return (
        <View>
            <Text>List of Names:</Text>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

export default UserList;
