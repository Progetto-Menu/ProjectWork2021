
interface FabActionButtonProps{
    icon: string
    onClick?: onClickFabButton
}

interface onClickFabButton{
    (e: React.MouseEvent): void
}


export const FabActionButton: React.FunctionComponent<FabActionButtonProps> = (props)=>{
    return <button className="btn btn-primary" onClick={props.onClick} style={{borderRadius: "50%", height: "60px", width: "60px", boxShadow: "0px 0px 10px 3px grey", position: "fixed", bottom: "80px", right: "20px", zIndex: 1000}}>
        <img src={props.icon} alt="" style={{width: "90%", height:"90%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    </button>
}