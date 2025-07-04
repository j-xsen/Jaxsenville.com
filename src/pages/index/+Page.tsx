import './Page.css'
import MenuButtons from './components/MenuButtons';
import {useMetadata} from 'vike-metadata-react';

export default function Page() {
    useMetadata({title: "Jaxsenville | Electronic Pop & Digital Art",
    description:"Enter Jaxsenville, Mayor Jaxsen's digital city. Stream the reflective EP and browse the synth-infused art that composes our city."})
    return (
        <>
            <MenuButtons/>
        </>
    );
}
