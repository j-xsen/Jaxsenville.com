import './Font.css'
import './App.css'
import './DisplayChanges.css'
import './ContactPage.tsx'
import ContactPage from './ContactPage.tsx';

function MenuButton({ text }: { text: string }) {
  return (
    <>
      <img id={`${text}-button`}
      className="menu-button"
      draggable="false"
      src={`./src/assets/${text}_outline.svg`}/>
    </>
  );
}

function Menu() {
  return (
    <>
      <MenuButton text="art"/>
      <MenuButton text="blahg"/>
      <MenuButton text="music"/>
      <MenuButton text="contact"/>
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

function FrontPage() {
  return (
    <>
      <HeaderImage/>
      <Menu/>
    </>
  )
}

function App() {
  return (
    <>
      <ContactPage/>
    </>
  );
}

export default App;
