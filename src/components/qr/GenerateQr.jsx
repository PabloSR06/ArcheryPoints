import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { listFiles, readFileContent } from '../../utils/filesDb';
import QRCode from 'react-native-qrcode-svg';


const GenerateQr = ({ route }) => {
    const [fileName, setFileName] = useState(route.params);
    const [qrData, setQrData] = useState("");

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
        <View>
            <QRCode
                value={JSON.stringify(qrData)}
                size={200} // Adjust the size as needed
            />
        </View>
    );
}

export default GenerateQr;