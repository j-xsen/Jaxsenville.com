import {useMetadata} from 'vike-metadata-react';
import ContactComponent from "./components/ContactComponent.tsx"
import './Page.css'

export default function Page() {
    useMetadata({
        title: "Contact | Reach Jaxsen in Jaxsenville",
        description: "Got ideas, collabs, or praise? Write to Mayor Jaxsen - the founder of Jaxsenville - and connect with the heart of this digital city.",
        openGraph: {
            type: "profile",
            firstName: "Jaxsen",
            lastName: "Honeycutt",
            gender: "male"
        }
    })
    return (
        <div className={"inner"}>
            <ContactComponent/>
        </div>
    )
}
