import React,{useState} from 'react';
import {View,StyleSheet,Text,ActivityIndicator,TouchableOpacity} from 'react-native';
import {Image,Button, Overlay} from 'react-native-elements';


const MiniPost = ({localhostUri}) => {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
      };

    return <View>
    <TouchableOpacity  onLongPress={toggleOverlay}  delayLongPress={100}    >
        <Image
        source={{ uri: `${localhostUri}/posts/image_608447f2a21acb3db4fc1e92-1620630893744.jpeg` }}
        style={{height: 160,width:120 }}
        PlaceholderContent={<ActivityIndicator />
        }
    />
    </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Image
            source={{ uri: `${localhostUri}/posts/image_608447f2a21acb3db4fc1e92-1620630893744.jpeg` }}
            style={{height: 400,width:300 }}
            PlaceholderContent={<ActivityIndicator />
            }
        />
      </Overlay>
    </View>
}

const styles = StyleSheet.create({});

export default MiniPost;