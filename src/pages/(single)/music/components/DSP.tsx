export default function DSP(props: {name: string, link: string, icon?: string}) {
    const iconFile = props.icon ?? props.name.toLowerCase();
    return <div className="album-card dsp">
        <a href={props.link} aria-label={props.name}>
            <img src={`/icon/${iconFile}.svg`} alt={`${props.name} logo`}/>
            <span className="dsp-label">{props.name}</span>
        </a>
    </div>
}