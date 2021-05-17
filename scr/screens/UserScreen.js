import React,{useContext} from 'react';
import {View,Text} from 'react-native';

const UserScreen = () => {

    return <View>
    <Text>User Screen</Text>

    </View>
}

UserScreen.navigationOptions = ({navigation}) => {
  return{
    title:'Rating',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Share')}>
      
        <FontAwesome name="plus" size={27} color="black" style={{marginHorizontal:10}} />
      </TouchableOpacity>
    )

  }
};

export default UserScreen;