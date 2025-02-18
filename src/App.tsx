import './Font.css'
import './App.css'
import './DisplayChanges.css'
import './ContactPage.tsx'
import ContactPage from './ContactPage.tsx';
import { useState } from 'react';

type TsetPage = (name: string) => void;

function MenuButton({ text, setPage }: { text: string, setPage: TsetPage }) {
  const changePage = () => {setPage(text);};
  return (
    <>
      <img id={`${text}-button`}
      className="menu-button"
      draggable="false"
      onClick={changePage}
      src={`./src/assets/${text}_outline.svg`}/>
    </>
  );
}

function Menu({setPage}: {setPage: TsetPage}) {
  return (
    <>
      <MenuButton text="art" setPage={setPage}/>
      <MenuButton text="blahg" setPage={setPage}/>
      <MenuButton text="music"setPage={setPage}/>
      <MenuButton text="contact"setPage={setPage}/>
    </>
  )
}

function HeaderImage() {
  return (
    <>
      <img id="header-image"
      src="/src/assets/jaxsenvillesign.png"
      draggable="false"/>
    </>
  )
}

function FrontPage({setPage}: {setPage: TsetPage}) {
  return (
    <>
      <HeaderImage/>
      <Menu setPage={setPage}/>
    </>
  )
}

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page=="home" && <FrontPage setPage={setPage}/>}
      {page=="contact" && <ContactPage setPage={setPage}/>}
    </>
  );
}

export default App;
