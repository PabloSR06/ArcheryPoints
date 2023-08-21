import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Table from './Table';

const PartyTable = ({route}) => {
    const tableData = route.params;
    return (
        <View>
            {Array.from(tableData.users, (user, index) => (
                <Table key={index} rounds={tableData.rounds} points={tableData.points} user={user} />
                
            ))}
        </View>
    );
};


export default PartyTable;
