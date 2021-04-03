
interface TopBarProps{
    text: string;
}

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
    return <div className="row position-sticky sticky-top">
        <div className="col-12 py-3 mb-1 text-center bg-primary text-white mx-auto">{props.text}</div>
    </div>
}