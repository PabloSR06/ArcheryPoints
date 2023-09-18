import React, { useState, useEffect } from 'react';
import { View , Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { readFileContent } from '../../utils/filesDb';
import { QrStyle } from '../../utils/styles/style';


const GenerateQr = ({ route }) => {
    const [fileName, setFileName] = useState(route.params);
    const [qrData, setQrData] = useState("");
    const [size, setSize] = useState(Dimensions.get('window').width);

    useEffect(() => {
        syncData();
    }, []);

    async function syncData() {
        try {
            const content = await readFileContent(fileName);
            setQrData(content);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <View style={QrStyle.container}>
            <QRCode
                value={JSON.stringify(qrData)}
                size={size/1.5} // Ajusta el tamaño según sea necesario
            />
        </View>
    );
}

export default GenerateQr;
