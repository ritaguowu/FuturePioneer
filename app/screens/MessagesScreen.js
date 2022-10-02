import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

const initialMessages = [
  {
    id: 1,
    title: "Mosh Hamedani",
    description: "Hey! Is this item still available?",
    image: require("../assets/user1.png"),
  },
  {
    id: 2,
    title: "Mosh Hamedani",
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require("../assets/user1.png"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  const renderSend = (props) => {
    return (
      <Send {... props}>
        <View>
          <MaterialCommunityIcons name="send-circle" size={32} style ={{marginBottom: 5, marginRight: 5}} color='#2e64e5'/>
        </View>
      </Send>
    )
  }

  const scrollToBottomComponent = () =>{
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    )
  } 

  return (
    <Screen>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
