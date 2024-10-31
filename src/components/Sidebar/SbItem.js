import {React, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {SbTitle, SbSub, SbLink} from './Sb.style'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import classnames from "classnames";
// styles
import useStyles from "./styles";
import {ListItemIcon, Button} from "@mui/material";

import { TabContext } from "../../context/TabContext";

const SbItem = ({ item, depth = 0, isSidebarOpened, nested }) => {
  const [collapsed, setCollapsed] = useState(false);
  const icon = collapsed ? <HiChevronUp /> : <HiChevronDown />;
  const { currTabList, addTab } = useContext(TabContext)
  const initNested = false;

  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }
  var classes = useStyles();

  // <SbTitle depth={depth}>
  //   <SbLink>{item.label}</SbLink>
  // </SbTitle>

  if(item.children != null && item.children.length > 0) {
    return (
      <div>
        <SbTitle depth={depth} onClick={toggleCollapse}>
          <div className={classnames(classes.linkIcon, {})}> {icon} </div>
          {item.label}
        </SbTitle>
        
        {/* <SbSub isOpen={collapsed}>  */}
        <SbSub isOpen={true}> 
          {item.children && item.children.map((child) => (
            <SbItem item={child} key={child.menuCd} depth={depth + 1} 
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextHidden]: !isSidebarOpened,
              }),
            }}
            isSidebarOpened={isSidebarOpened}
            nested={child.children && child.children.length > 0 ? true : false}
            />
            
          ))}
        </SbSub>
      </div>
    )
  } else {
    return (
        <SbTitle depth={depth}>
          <SbLink>
            {/* 제일 하단  */}
            {/* [{depth}] */}
            <div className={classes.listIcon}> {!nested ? "-" : icon} </div>
            {item.blog == undefined ? 
            <Button onClick={()=>addTab(item.menuCd, item.label)}>{item.label}</Button>
            :
            <Link className={classes.listText} to={item.link}>{item.label}</Link>
            }
          </SbLink>
        </SbTitle>
    )
  }
}

export default SbItem