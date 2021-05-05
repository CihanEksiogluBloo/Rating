import React,{useContext} from 'react';
import {Input,Button} from 'react-native-elements';
import Spacer from './Spacer';
import {Context as LocationContext} from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';


const TrackForm = ({startRecording,stopRecording,changeName,
    contextState: {name,recording,locations}

}) => {
    const [saveTrack] = useSaveTrack();

    

    return <>
    <Spacer>
        <Input onChangeText={changeName} value={name} placeholder="Enter Name" />
    </Spacer>
    <Spacer>
    
    {
        recording 
        ? <Button title='Stop' onPress={stopRecording} />
        : <Button title="Start Recording" onPress={startRecording} />
    }
    </Spacer>
    <Spacer>
    
    {
      !recording && locations.length
      ? <Button title="Save Recording" onPress={saveTrack} />
      : null
    }
    </Spacer>
    
    

    </>

};

export default TrackForm;
