function MenuButton({ text }: { text: string }) {
    return (
      <>
      <a href={`/${text}`}>
        <img id={`${text}-button`}
        className="menu-button"
        draggable="false"
        src={`./${text}_outline.svg`}/>
        </a>
      </>
    );
  }

export default function MenuButtons() {
    return (
      <>
        <MenuButton text="art" />
        <MenuButton text="blahg" />
        <MenuButton text="music" />
        <MenuButton text="contact" />
      </>
    )
  }