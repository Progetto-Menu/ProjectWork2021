
interface TopBarProps{
    text: string;
}

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
    return <div className="position-fixed fixed-top overflow-hidden">
        <div className="col-12 py-3 mb-1 text-center bg-primary text-white mx-auto">{props.text}</div>
    </div>
}