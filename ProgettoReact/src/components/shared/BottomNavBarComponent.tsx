import React from 'react';

export interface BottomNavBarProps {
      actions: BottomBarAction[]
}

interface BottomBarAction {
      label: string;
      selected: boolean;
      onClick: OnClickBottomBarAction;
}

interface OnClickBottomBarAction {
      (): void;
}

export const BottomNavBarComponent: React.FunctionComponent<BottomNavBarProps> = (prop) => {

      const width: number = 100.0 / prop.actions.length;

      return <div className="text-center position-fixed fixed-bottom d-flex flex-row align-content-center justify-content-center">
            {prop.actions.map((value, index)=>{
                  return value.selected ? <div style={{width: width + "%", cursor: "pointer"}} className="bg-primary p-3 text-white" onClick={()=>value.onClick()}>{value.label}</div>
                  : <div style={{width: width + "%", cursor: "pointer"}} className="bg-secondary p-3" onClick={()=>value.onClick()}>{value.label}</div>
            })}
      </div>
}