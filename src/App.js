import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { toast } from 'react-toastify';

import Questions from "./components/questions";
import QuestionModal from "./components/question-modal";

import Add from './add.svg';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

toast.configure();
const client = new ApolloClient({
  uri: "https://api.8base.com/cjye3zwm2000201jzbo0yepd2"
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <div>GOT Quizapp</div>
        </header>
        <Questions />
        <button className="add-question" onClick={_ => setModalOpen(true)}>
          <img src={Add} alt="Click to create a new question"/>
        </button>
        <QuestionModal
          isOpen={modalOpen}
          closeModal={closeModal}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;