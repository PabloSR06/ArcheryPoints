import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Table from './Table';

const PartyTable = () => {
    const [tableData, setTableData] = useState();

    var party = { rounds: 5, points: 3 };
    var users = [{ id: 1, name: "name1" }, { id: 2, name: "name2" }, { id: 3, name: "name3" }];
    return (
        <View>
            {Array.from(users, (user, index) => (
                <Table key={index} rounds={party.rounds} points={party.points} user={user} />
                
            ))}
        </View>
    );
};


export default PartyTable;
