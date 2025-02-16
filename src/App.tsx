import './App.css'

function MenuButton({ text }: { text: string }) {
  
  return (
    <>
      <img id={`${text}-button`}
      className="menu-button"
      src={`/src/assets/${text}.svg`}/>
    </>
  );
}

function Menu() {
  return (
    <>
      <MenuButton text="art"/>
      <MenuButton text="blahg"/>
    </>
  )
}

function HeaderImage() {
  return (
    <>
      <img id="header-image" src="/src/assets/jaxsenvillesign.png"/>
    </>
  )
}

function App() {

  return (
    <>
      <HeaderImage/>
      <Menu/>
    </>
  );
}

export default App;
