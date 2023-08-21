import { View, Text, Button} from 'react-native';




const Home = ({navigation}) => {

  return (

    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>

      <View>
        <Button title='s' onPress={ () => {navigation.navigate('Settingss')}}/>
      </View>
    </View>

  );
};


export default Home;
