import '../css/SinglePage.css'
import '../css/ContactPage.css'
import PageTitleButton from './PageTitleButton';

// function PhoneImage() {
//     return (
//         <>
//         <img id="telephone"
//         src="/phone_outline.svg"/>
//         </>
//     )
// }

function PageContainer() {
    return (
        <>
        <div id="page">
            <h1>Reach the Mayor</h1>
            <p>jaxsen (at) jxsen (dot) com</p>
        </div>
        </>
    )
}

function ContactPage() {
    return (
        <>
        <PageTitleButton text="contact"/>
        <PageContainer/>
        </>
    )
}

export default ContactPage;