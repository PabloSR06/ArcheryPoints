import RNFS from 'react-native-fs';

const path = RNFS.DocumentDirectoryPath + '/games';

export async function listFiles() {
    try {
        await ifDirectoryExists(path);
        const files = await RNFS.readdir(path);
        console.log('Files:', files);
        return files;
    } catch (error) {
        console.log('Error:', error);
    }
};

export async function ifDirectoryExists(directoryPath) {
    const isDirectoryExists = await RNFS.exists(directoryPath);
    if (!isDirectoryExists) {
        await RNFS.mkdir(directoryPath);
    }
};

export async function writeJsonToFile(fileName, jsonData) {
    const filePath = path + '/' + fileName + '.json';
    try {
        await ifDirectoryExists(path);
        await RNFS.writeFile(filePath, JSON.stringify(jsonData));
        console.log('JSON data written to file:', filePath);
    } catch (error) {
        console.log('Error writing JSON data:', error);
    }
};

export async function readFileContent(fileName) {
    const filePath = path + '/' + fileName + '.json';
    try {
      const content = await RNFS.readFile(filePath, 'utf8');
      console.log('File Read');
      return JSON.parse(content);
    } catch (error) {
      console.log('Error reading file:', error);
    }
  };