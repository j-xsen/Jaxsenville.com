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

function ContactPage() {
    return (
        <>
        <PhoneImage/>
        <PageContainer/>
        </>
    )
}

export default ContactPage;