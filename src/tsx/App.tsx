import '../css/Font.css'
import '../css/App.css'
import PageTitleButton from './PageTitleButton.tsx';
import ContactPage from './ContactPage.tsx';
import ArtPage from './ArtPage.tsx';
import MusicPage from './MusicPage.tsx';
import { useState } from 'react';
import BlahgPage from './BlahgPage.tsx';
// import '../css/DisplayChanges.css'

type TsetPage = (name: string) => void;

function MenuButton({ text, setPage }: { text: string, setPage: TsetPage }) {
  const changePage = () => {setPage(text);};
  return (
    <>
      <img id={`${text}-button`}
      className="menu-button"
      draggable="false"
      onClick={changePage}
      src={`./${text}_outline.svg`}/>
    </>
  );
}

function HeaderImage({ curPage, goHome }: { curPage: string, goHome: () => void }) {
  return (
    <>
      <img id="header-image"
      className={curPage}
      onClick={goHome}
      src="/jaxsenvillesign.png"
      draggable="false"/>
    </>
  )
}

function FrontPage({setPage}: {setPage: TsetPage}) {
  return (
    <>
      <MenuButton text="art" setPage={setPage}/>
      <MenuButton text="blahg" setPage={setPage}/>
      <MenuButton text="music" setPage={setPage}/>
      <MenuButton text="contact" setPage={setPage}/>
    </>
  )
}

function App() {
  const [page, setPage] = useState("home");

  const goHome = () => setPage("home");

  return (
    <>
    <HeaderImage curPage={page == "home" ? "home" : "single"} goHome={goHome}/>
      {page!="home" && <PageTitleButton text={page} goHome={goHome}/>}
      {page=="home" && <FrontPage setPage={setPage}/>}
      {page=="art" && <ArtPage/>}
      {page=="contact" && <ContactPage/>}
      {page=="music" && <MusicPage/>}
      {page=="blahg" && <BlahgPage/>}
    </>
  );
}

export default App;
