import '../css/Gallery.css'
import '../css/SinglePage.css'
import '../css/ArtPage.css'

interface IArtPiece {
    name: string,
    url: string,
    material: string,
    year: number
}

function ArtPiece({ piece, spot }: { piece: IArtPiece, spot: number }) {
    return(
        <>
        <div className={`Frame${ spot == 0 ? " Frame0" : "" }`}>
            <img src={`./art/${piece.url}.jpg`} className="ArtPiece"/>
            <h1>{piece.name}</h1>
            <p>{piece.year}</p>
            <p>{piece.material}</p>
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

    return (
        <>
        <div className="Gallery">
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