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

function App() {

  return (
    <>
      <img id="header-image" src="/src/assets/jaxsenvillesign.png"/>
      <MenuButton text="blahg"/>
      <MenuButton text="art"/>
    </>
  );
}

export default App;
