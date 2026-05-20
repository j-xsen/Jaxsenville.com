import './Page.css'
import MenuButtons from './components/MenuButtons';
import {useMetadata} from 'vike-metadata-react';

export default function Page() {
    useMetadata({
        title: "Jaxsenville | The Digital Town of Artist Jaxsen Honeycutt",
        description: "Step into Jaxsenville, the digital town created by Jaxsen Honeycutt. Explore original artwork, creative projects, blog posts, and ways to get in touch."
    })
    return (
        <nav role={"navigation"}>
            <MenuButtons/>
        </nav>
    );
}
