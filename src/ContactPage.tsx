import './ContactPage.css'

function PhoneImage() {
    return (
        <>
        <img id="telephone"
        src="/phone_outline.svg"/>
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

function ContactPage({setPage}: {setPage: (name: string)=>void}) {
    const backHome = () => {setPage("home");}
    return (
        <>
        <PhoneImage/>
        <img
        id="single-page-header-image"
        draggable="false"
        onClick={backHome}
        src="/contact_outline.svg"/>
        <PageContainer/>
        </>
    )
}

export default ContactPage;