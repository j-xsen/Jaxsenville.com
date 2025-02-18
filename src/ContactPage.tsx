import './ContactPage.css'

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

function JaxsenvilleSign() {
    return (
        <>
        <img
        id="jaxsenvillesign"
        draggable="false"
        src="/src/assets/jaxsenvillesign.png"/>
        </>
    )
}

function ContactPage() {
    return (
        <>
        <JaxsenvilleSign/>
        <PhoneImage/>
        <img
        id="single-page-header-image"
        draggable="false"
        src="/src/assets/contact_outline.svg"/>
        <PageContainer/>
        </>
    )
}

export default ContactPage;