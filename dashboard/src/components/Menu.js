import React,{useState} from "react";
import { Link } from "react-router-dom";




const Menu = () => {
  const [selectedMenu,setselectedMenu]=useState(0);
  const [isProfileDrop,setisProfileDrop]=useState(false);

   const clickMenuHandler=(ind)=>{
    setselectedMenu(ind);
  };
   const ProfileDropHandler=(ind)=>{
    setisProfileDrop(!isProfileDrop);
   }

   const menuClass="menu";
   const activeMenuClass="menu selected";


  return (
    <div className="menu-container">
      <img src="/logo.png" style={{width:"50px"}} ></img>
      <div className="menus">
        <ul>
          <li>
             <Link style={{textDecoration:"none"}} to="/" onClick={()=>clickMenuHandler(0)}>
              <p className={selectedMenu===0 ?activeMenuClass:menuClass}>
                Dashboard
              </p>
              </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/orders" onClick={()=>clickMenuHandler(1)}>
              <p className={selectedMenu===1 ?activeMenuClass:menuClass}>
                Order
              </p>
              </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/holdings" onClick={()=>clickMenuHandler(2)}>
              <p className={selectedMenu===2 ?activeMenuClass:menuClass}>
                Holdings
              </p>
              </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/positions" onClick={()=>clickMenuHandler(3)}>
              <p className={selectedMenu===3 ?activeMenuClass:menuClass}>
                Positions
              </p>
              </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/funds" onClick={()=>clickMenuHandler(4)}>
              <p className={selectedMenu===4 ?activeMenuClass:menuClass}>
                Funds
              </p>
              </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none"}} to="/apps" onClick={()=>clickMenuHandler(5)}>
              <p className={selectedMenu===5 ?activeMenuClass:menuClass}>
                Apps
              </p>
              </Link>
            
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={ProfileDropHandler}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;