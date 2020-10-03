/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Button, List, ListItem, Textarea } from "@chakra-ui/core";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";

const ENDPOINT = "http://localhost:3001";
let socket;

export default function Home() {
  let [chat, setChat] = useState([]);
  let [textInput, setTextInput] = useState("");
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    socket.on("open", function () {
      console.log("Conected!");
    });

    socket.on("newMessage", (data) => {
      console.log("message received: " + data);
      let newChat = chat;
      newChat.push(data);
      console.log(newChat);
      setChat(newChat);
    });

    socket.on("close", function () {
      console.log("Disconnected");
    });

    socket.on("error", function (e) {
      if (e.error() != "websocket: close sent") {
        console.log("An unexpected error occured: ", e.error());
      }
    });
  }, []);

  let sendChat = () => {
    socket.emit("sendMessage", textInput);
  };

  let handleTextAreaChange = (e) => {
    let inputValue = e.target.value;
    setTextInput(inputValue);
  };

  let textChat = () => {
    let messageList = chat.map((message) => {
      return <ListItem>{message}</ListItem>;
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
        {textChat()}
      </Box>
      <Textarea
        placeholder="Here is a sample placeholder"
        value={textInput}
        onChange={handleTextAreaChange}
      />
      <Button variantColor="green" onClick={() => sendChat()}>
        Send
      </Button>
    </div>
  );
}
