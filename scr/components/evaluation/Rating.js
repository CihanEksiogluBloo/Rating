import React,{useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {AirbnbRating} from 'react-native-elements';





const Rating = ({userID,postID,ratePost,size}) => {

    return <View>

    <AirbnbRating
        style={{flexDirection:"row"}}
        count={5}
        reviews={["Terrible", "Bad", "Meh","Good", "Great!"]}
        defaultRating={3}
        size={size || 30}
        onFinishRating={(star)=>ratePost(userID,postID,star) }
      />
    
    </View>
}


const styles = StyleSheet.create({

});

export default Rating;
