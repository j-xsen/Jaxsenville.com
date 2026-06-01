export default function DSP(props: {name: string, link: string, icon?: string, iconOnly?: boolean}) {
    const iconFile = props.icon ?? props.name.toLowerCase();
    return <div className={`album-card dsp${props.iconOnly ? ' dsp--icon-only' : ''}`}>
        <a href={props.link} aria-label={props.name}>
            <img src={`/icon/${iconFile}.svg`} alt={`${props.name} logo`}/>
            {!props.iconOnly && props.name}
        </a>
    </div>
}