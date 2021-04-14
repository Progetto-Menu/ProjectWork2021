
interface TopBarProps {
    text: string;
    navigationIcon?: string;
    onClickIcon?: OnClickIcon
}

interface OnClickIcon {
    (): void
}

export const TopBar: React.FunctionComponent<TopBarProps> = (props) => {
    return <div className="position-fixed fixed-top overflow-hidden">
        <div className="col-12 bg-primary text-white position-relative" style={{ height: "55px" }}>
            {props.navigationIcon != null && <img src={props.navigationIcon} alt="" onClick={() => {
                if (props.onClickIcon != null) props.onClickIcon()
            }} />}
            <div className="position-absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                {props.text}
            </div>

        </div>
    </div>
}