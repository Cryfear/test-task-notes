import "./styles/App.scss";
import { NotesContainer } from "./components/Notes/NotesContainer";
import { Content } from "./components/Content/Content";
import React from "react";

function App() {
  return (
    <div className="App">
      <NotesContainer />
      <Content />
    </div>
  );
}

export default App;
