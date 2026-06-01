export default function DSP(props: {name: string, link: string, icon?: string}) {
    const iconFile = props.icon ?? props.name.toLowerCase();
    return <div className="album-card dsp">
        <a href={props.link}>
            <img src={`/icon/${iconFile}.svg`} className="icon" alt={`${props.name} logo`}/>
            {props.name}</a>
    </div>
}