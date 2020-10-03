/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, List, ListItem, Textarea } from "@chakra-ui/core";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";

const ENDPOINT = "http://localhost:3001";

export default function Home() {
  let [chat, setChat] = useState([]);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("newMessage", (data) => {
      let newChat = [...chat, data];
      setChat(newChat);
    });
  }, []);

  let textChat = (messages) => {
    let messageList = messages.map((message) => {
      return <ListItem>testMessage</ListItem>;
    });
    return <List styleType="disc">{messageList}</List>;
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        background-color: blue;
        padding: 20px;
        height: 55rem;
      `}
    >
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="black"
        css={css`
          flex: 1;
        `}
      >
        {textChat}
      </Box>
      <Textarea placeholder="Here is a sample placeholder" />
    </div>
  );
}
