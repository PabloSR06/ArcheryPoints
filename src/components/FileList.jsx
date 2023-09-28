import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { HomeStyle } from '../utils/styles/style';

const FileList = ({item, onHandlePlay, onHandleShare, onHandleDelete}) => {
  const [expanded, setExpanded] = useState(false);

  
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>
             {item}
            </ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded)
      }}
    >
      <TouchableOpacity onPress={onHandlePlay}  style={HomeStyle.fileItem}>
        <Text>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onHandleShare} style={HomeStyle.fileItem}>
        <Text>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onHandleDelete} style={HomeStyle.fileItem}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </ListItem.Accordion >
  );
}

export default FileList;