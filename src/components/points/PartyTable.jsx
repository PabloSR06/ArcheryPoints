import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import { listFiles, readFileContent } from '../../utils/filesDb';
import Table from './Table';

const PartyTable = () => {
    const [forceRender, setForceRender] = useState(0);
    const fileName = '1692706871245';//route.params;

    const usersDataRef = useRef([]);
    const roundsDataRef = useRef(0);
    const pointsDataRef = useRef(0);

    async function fetchData() {
        try {
            const content = await readFileContent(fileName);

            usersDataRef.current = content.users;
            roundsDataRef.current = content.rounds;
            pointsDataRef.current = content.points;

            setForceRender(Math.random());
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            <Text>Table for {fileName}</Text>
            {Array.from(usersDataRef.current, (user, index) => (
                <Table key={index} rounds={roundsDataRef.current} points={pointsDataRef.current} user={user} />
            ))}
        </View>
    );
};

export default PartyTable; 
