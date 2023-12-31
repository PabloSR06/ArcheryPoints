import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { listFiles, readFileContent } from '../../utils/filesDb';
import Table from './Table';
import { LoaderStyle } from '../../utils/styles/style';

const PartyTable = ({ route }) => {
    const [forceRender, setForceRender] = useState(0);
    const fileName = route.params.itemName;
    const [loading, setLoading] = useState(true);
    //const fileName = '1692960659592';

    const usersDataRef = useRef([]);
    const roundsDataRef = useRef(0);
    const pointsDataRef = useRef(0);

    async function fetchData() {
        try {
            setLoading(true);
            const content = await readFileContent(fileName);

            usersDataRef.current = content.users;
            roundsDataRef.current = content.rounds;
            pointsDataRef.current = content.points;

            setForceRender(Math.random());
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [route.params.itemName]);

    const renderTables = () => {
        return (
            <View>
                <Text>Table for {fileName}</Text>
                {Array.from(usersDataRef.current, (user, index) => (
                    <Table key={index} rounds={roundsDataRef.current} points={pointsDataRef.current} user={user} fileName={fileName} />
                ))}
            </View>
        );
    };
    const renderLoader = () => {
        return (
            <View style={LoaderStyle.container}>
                <View style={LoaderStyle.centered}>
                    <ActivityIndicator size="large" animating={loading} />
                </View>
            </View>
        );
    };

    return (
        <View>
            {loading ? renderLoader() : renderTables()}
        </View>
    );
};

export default PartyTable; 
