import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllUsers, getDbConnection, getExtUsers, getOwnerUser, getUsers } from '../../utils/sqliteDb';
import { generateExtId } from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserListStyle, UserProfile } from '../../utils/styles/style';
import { Button } from 'react-native-elements';

const UserList = ({ navigation, route }) => {
    const [list, setList] = useState([]);
    const [owner, setOwner] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers() {
        try {
            var owner = await getOwnerUser();
            console.log(owner);
            var list = await getExtUsers();
            setList(list);
            setOwner(owner);
        } catch (error) {
            console.log(JSON.stringify(error));
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
    const renderMyUser = () => {
        
        const handlePress = () => {
            if (owner.length == 0) {
                navigation.navigate('ProfileInput');
            } else {
                navigation.navigate('ProfileEdit', owner[0]);
            }
        };

        return (
            <View >
                <Text style={UserListStyle.listTitle}>My Profile</Text>
                <TouchableOpacity onPress={handlePress}>
                    <View style={UserProfile.container}>
                        {owner.length == 0 ?
                            <Text style={UserProfile.text}>ADD Profile</Text>
                            :
                            <Text style={UserProfile.text}>{owner[0].name}</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    const renderList = () => {
        return (
            <View style={UserListStyle.container}>
                <Text style={UserListStyle.listTitle}>List of Users:</Text>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUserList}
                />
                <Button icon={() => <Icon name="person-add-outline" size={20} color="white" />} title="New User" onPress={() => navigation.navigate('NewUser')} />
            </View>
        );
    };

    return (
        <View style={UserListStyle.container}>

            {renderMyUser()}
            {owner.length != 0 ? renderList() : null}

        </View>
    );
};



export default UserList;
