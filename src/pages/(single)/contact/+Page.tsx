import {useMetadata} from 'vike-metadata-react';
import ContactComponent from "./components/ContactComponent.tsx"
import './Page.css'

export default function Page() {
    useMetadata({title: "Contact | Jaxsenville"})
    return (
        <div className={"inner"}>
            <ContactComponent/>
        </div>
    )
}
