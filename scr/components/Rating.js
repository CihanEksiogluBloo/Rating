import React from 'react';
import {View,StyleSheet} from 'react-native';
import {AirbnbRating} from 'react-native-elements';


const Rating = () => {
    return <View>

    <AirbnbRating
        style={{flexDirection:"row"}}
        count={5}
        reviews={["Terrible", "Bad", "Meh","Good", "Great!"]}
        defaultRating={3}
        size={30}
      />
    
    </View>
}


const styles = StyleSheet.create({

});

export default Rating;
