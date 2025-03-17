import { useMetadata } from 'vike-metadata-react';
import PageContainer from "./components/PageContainer"
import './Page.css'

export default function Page() {
    useMetadata({title: "Contact | Jaxsenville"})
    return (
        <>
        <PageContainer/>
        </>
    )
}
