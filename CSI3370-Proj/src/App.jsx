import { useState } from 'react'
import Header from "./components/header";
import Footer from "./components/footer";
import MusicControlBar from "./components/MusicControlBar";
import Home from "./pages/Home";
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <MusicControlBar />
      <Footer />
    </div>
  );
}
export default App
