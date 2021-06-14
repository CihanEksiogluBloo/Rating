import React, { useState } from 'react';
import { View,StyleSheet,TouchableOpacity } from 'react-native';
import {Text,Input} from 'react-native-elements';
import CommentsOnPost from './CommentsOnPost';

const CommentingArea = ({PostCommenting,postID,}) => {
    const [comment, setComment] = useState(null);
    const [myComment, setMyComment] = useState(false);
    return <View>
    {!myComment ? 
        <View
          style={{ backgroundColor: "#e1e5ea", borderRadius: 20, padding: 10 }}
        >
          <Input
            placeholder="Comment... (Max 466 Characters.)"
            maxLength={466}
            containerStyle={styles.InputContainer}
            inputStyle={styles.InputLetterStyle}
            onChangeText={(c) => setComment(c)}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                PostCommenting(postID,comment)
                setMyComment(true);
              }}
              disabled={comment ? false : true}
            >
              <Text style={styles.InputButton}>Post</Text>
            </TouchableOpacity>
          </View>
        </View> :
        <CommentsOnPost
                    nick_name={"Me"}
                    comment={comment}
                  />
      }
    </View>
}

const styles = StyleSheet.create({
    InputContainer: {
        borderRadius: 20,
        backgroundColor: "rgba(158, 150, 150, 0.4)",
        borderBottomColor: "rgba(158, 150, 150, 1.0)",
        marginBottom: 10,
      },
      InputButton: {
        color: "#47597e",
        fontSize: 20,
        backgroundColor: "#b6c9f0",
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 15,
      },

});

export default CommentingArea;