import './App.css'

function MenuButton({ text }: { text: string }) {
  
  return (
      <h2>{text}</h2>
  );
}

function App() {

  return (
    <>
      <h1>Jaxsenville</h1>
      <h3>The home and birthplace of</h3>
      <h2>Jaxsen Honeycutt</h2>
      <MenuButton text="Blahg"/>
    </>
  );
}

export default App;
