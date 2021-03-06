import React, { useState } from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Welcome from "./components/Welcome";
import MenuBar from "./components/MenuBar"
import Calendar from "./components/Calendar"
import Stats from "./components/Stats"
import Home from "./components/Home"
import ChatBot from 'react-simple-chatbot';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./assets/logo.png";
import { ModalManager } from "@material-ui/core";

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const steps = [
  {
    id: '1',
    message: 'Hi!, How can I help you?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Did you say {previousValue}?',
    end: true,
  },
];

function App() {
  var userId = localStorage.getItem('userId');
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={MenuBar} />
        <Route path="/" component={Welcome} />
        <Route exact path="/">
          <Home />
        </Route>
        <ChatBot
          headerTitle="Speech Synthesis"
          speechSynthesis={{ enable: true, lang: 'en' }}
          steps={steps} 
          floating={true}
          />
        <Switch>
          <Route path="/calendar" component={Calendar} />
          <Route path="/stats" component={Stats} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;