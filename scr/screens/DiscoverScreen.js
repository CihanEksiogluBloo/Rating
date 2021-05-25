import React,{useState,useContext,useEffect} from 'react';
import {StyleSheet,FlatList,ScrollView,View} from 'react-native';
import {Text,SearchBar,Button} from 'react-native-elements';
import {SafeAreaView} from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import {Context as PostContext} from '../context/PostContext';
import {NavigationEvents} from 'react-navigation';
import MiniPost from '../components/MiniPost';
import {getLocalhostUri} from '../api/localhostUri';
import CatButtonGroup from '../components/CatButtonGroups';


const DiscoverScreen = ({navigation}) => {
    const {state,fetchPosts,fetchPostsWithCategory} = useContext(PostContext);
    const [search,updateSearch] = useState("");
    const localhostUri = getLocalhostUri();

    //category === Object { "selectedIndex": 1, }

    useEffect(()=>{
        fetchPosts();
    },[])

    const press = (category) => {
        fetchPostsWithCategory(category);
    }





    return (
    <SafeAreaView  forceInset={{ top: "always" }}>
    <NavigationEvents onWillBlur={fetchPosts} />
    <Spacer>
        <SearchBar   
            placeholder="Type Here..."
            onChangeText={(text)=> updateSearch(text)}
            value={search}
            
            containerStyle={styles.SearchBarContainer}
            inputContainerStyle={styles.SearchBarInput}
            inputStyle={{color:'rgb(123,104,238)'}}
        />
    </Spacer>
    
    <CatButtonGroup 
        press={press}
    />
    
      


    <FlatList 
        data ={state}
        numColumns={3}
        keyExtractor ={(item) => item._id}
        renderItem= {({item}) => {
            return (
            <View style={{flexDirection:"row"}}>
                <MiniPost 
                localhostUri={localhostUri}
                imageName={item.image}
                profile_image={item.profile_image}
                nick_name={item.nick_name}
                star={item.star}
                />
            </View>
            )

        }}

        />
        
        


    </SafeAreaView>
    

    );
}



DiscoverScreen.navigationOptions = {
    title:'Discover',
    tabBarIcon: <MaterialIcons name="emoji-people" size={20} color="black" />
};

const styles = StyleSheet.create({
    SearchBarInput:{
        borderRadius:20,
        backgroundColor: 'rgba(158, 150, 150, 0.4)',
        borderBottomColor:'rgba(158, 150, 150, 1.0)',

        
    },
    SearchBarContainer:{
        backgroundColor:'rgba(0, 0, 0, 0.0)',
        borderColor: 'rgba(158, 150, 150, 0.0)',
        borderBottomColor:'rgba(158, 150, 150, 0.0)',
        borderTopColor:'rgba(158, 150, 150, 0.0)',

    },
    ButtonGroupStyle:{
        height:50,
        borderRadius:10,
    },
    ButtonGrouptextStyle:{
        fontSize:12,
        fontWeight:"bold"
        
    }


})

export default DiscoverScreen;