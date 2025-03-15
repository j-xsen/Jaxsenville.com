import '../css/Font.css'
import '../css/App.css'
import PageTitleButton from './PageTitleButton.tsx';
import ContactPage from './ContactPage.tsx';
import ArtPage from './ArtPage.tsx';
import MusicPage from './MusicPage.tsx';
import BlahgPage from './BlahgPage.tsx';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router';
// import '../css/DisplayChanges.css'

function MenuButton({ text }: { text: string }) {
  return (
    <>
    <Link to={`/${text}`}>
      <img id={`${text}-button`}
      className="menu-button"
      draggable="false"
      src={`./${text}_outline.svg`}/>
    </Link>
    </>
  );
}

function HeaderImage() {

  function getClassName () {
    return useLocation().pathname == "/" ? "home" : "single"
  }

  return (
    <>
    <Link to="/">
    <div id="header-flex" className={getClassName()}>
      <img id="header-image"
      src="/jaxsenvillesign.png"
      draggable="false"/>
    </div>
    </Link>
    </>
  )
}

function FrontPage() {
  return (
    <>
      <MenuButton text="art" />
      <MenuButton text="blahg" />
      <MenuButton text="music" />
      <MenuButton text="contact" />
    </>
  )
}

function App() {
  return (
    <>
    <BrowserRouter>
      <HeaderImage />
      <Routes>
        <Route index element={<FrontPage />} />
        <Route path="art" element={ <ArtPage /> } />
        <Route path="contact" element={<ContactPage />} />
        <Route path="music" element={<MusicPage />} />
        <Route path="blahg" element={<BlahgPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
