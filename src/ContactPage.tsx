import './ContactPage.css'

type emptyFunction = () => void;

function PhoneImage() {
    return (
        <>
        <img id="telephone"
        src="/src/assets/phone_outline.svg"/>
        </>
    )
}

function PageContainer() {
    return (
        <>
        <div id="page">
            <h1>Reach the Mayor</h1>
            <p>jaxsen (at) jaxsenville (dot) com</p>
        </div>
        </>
    )
}

function JaxsenvilleSign({backHome}: {backHome: emptyFunction}) {
    return (
        <>
        <img
        id="jaxsenvillesign"
        draggable="false"
        onClick={backHome}
        src="/src/assets/jaxsenvillesign.png"/>
        </>
    )
}

function ContactPage({setPage}: {setPage: (name: string)=>void}) {
    const backHome = () => {setPage("home");}
    return (
        <>
        <JaxsenvilleSign backHome={backHome}/>
        <PhoneImage/>
        <img
        id="single-page-header-image"
        draggable="false"
        onClick={backHome}
        src="/src/assets/contact_outline.svg"/>
        <PageContainer/>
        </>
    )
}

export default ContactPage;