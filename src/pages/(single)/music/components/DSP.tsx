export default function DSP(props: {name: string, link:string}) {
    return <div className="album-card dsp">
        <a href={props.link}>
            <img src={`/icon/${props.name.toLowerCase()}.svg`} className="icon" title={`${props.name} logo`} alt={`${props.name} logo`}/>
            {props.name}</a>
    </div>
}