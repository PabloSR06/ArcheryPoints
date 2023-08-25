import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { writeJsonToFile, readFileContent } from '../../utils/filesDb';


const Table = ({ rounds, points, user, fileName }) => {
  const [tableData, setTableData] = useState(
    Array.from({ length: rounds }, () => Array.from({ length: points }, () => 0))
  );
  const userData = user;

  const [totalPoints, setTotal] = useState(0);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;


    let total = 0;
    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < newData[i].length; j++) {
        total += newData[i][j];
      }
    }


    userData.points = tableData;
    userData.totalPoints = total;
    setTotal(total);

    console.log("El total de la matriz es:", total);
    setTableData(newData);

    console.log('user', userData);
  };

  useEffect(() => {
    syncData();
  }, [tableData]);

  useEffect(() => {

    if(userData.totalPoints === undefined){
      setTotal(0);
      setTableData(Array.from({ length: rounds }, () => Array.from({ length: points }, () => 0)));
    }else{
      setTotal(userData.totalPoints);
      setTableData(userData.points);
    }
    
    

  }, []);


  async function syncData() {
    try {
      console.log('syncData');
      console.log('user', userData.id);
      var content = await readFileContent(fileName);
      var index = content.users.findIndex(user => user.id === userData.id);
      content.users[index] = userData;
      console.log(JSON.stringify(content, null, 2));
      await writeJsonToFile(fileName, content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <View>
      <Text>Table for {user.name}</Text>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.cell}></Text>
          {Array.from({ length: points }, (_, index) => (
            <Text key={index} style={styles.cell}>
              Tirada {index + 1}
            </Text>
          ))}
          <Text style={styles.cell}>Suma</Text>
        </View>
        {tableData.map((rowData, rowIndex) => (
          <View key={rowIndex} style={styles.dataRow}>
            <Text style={styles.cell}>Ronda {rowIndex + 1}</Text>
            {rowData.map((cellData, colIndex) => (
              <TextInput
                key={colIndex}
                style={styles.inputCell}
                value={cellData.toString()}
                onChangeText={(value) =>
                  handleCellChange(rowIndex, colIndex, parseInt(value, 10))
                }
                keyboardType="numeric"
              />
            ))}
            <Text style={styles.inputCell}>4</Text>
          </View>
        ))}
        <Text>Total: {totalPoints}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 5,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  inputCell: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    padding: 5,
  },
});

export default Table;