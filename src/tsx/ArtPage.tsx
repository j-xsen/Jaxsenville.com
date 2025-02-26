import '../css/SinglePage.css'
import '../css/ArtPage.css'
import { useState } from 'react'

interface IArtPiece {
    name: string,
    url: string,
    material: string,
    year: number
}

function ArtPiece({ piece, spot }: { piece: IArtPiece, spot: number }) {
    return(
        <>
        <div className={`ArtFrame Frame${spot}`}>
            <img src={`./art/${piece.url}.jpg`} className="ArtPiece"/>
            <h1>{piece.name}</h1>
            <p>{piece.year}</p>
        </div>
        </>
    )
}

function ArtGallery() {
    const genie: IArtPiece = {
        name: "Genie",
        url: "genie",
        material: "iPad's ProCreate",
        year: 2025
    }

    const mt_jaxsen: IArtPiece = {
        name: "Mt. Jaxsen",
        url: "mt_jaxsen",
        material: "iPad's ProCreate",
        year: 2024
    }

    const good_ending: IArtPiece = {
        name: "The Good Ending",
        url: "the_good_ending",
        material: "Oil on Canvas",
        year: 2024
    }

    const [curPiece, setCurPiece] = useState(0);

    return (
        <>
        <div id="ArtGallery">
            <ArtPiece piece={genie} spot={0}/>
            <ArtPiece piece={mt_jaxsen} spot={1}/>
            <ArtPiece piece={good_ending} spot={2}/>
        </div>
        </>
    )
}

function ArtPage() {
    return (
        <>
        <ArtGallery/>
        </>
    )
}

export default ArtPage;