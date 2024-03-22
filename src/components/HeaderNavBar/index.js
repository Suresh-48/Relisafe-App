import React, { useState, useEffect } from "react";
import { Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Avatar } from "@material-ui/core";
import "../../css/HeaderNavBar.scss";
import Tooltip from "@mui/material/Tooltip";
import logo from "../core/Images/logo.png";
import { useHistory, Link } from "react-router-dom";

//component
import Api from "../../Api.js";
import "../../css/HeaderNavBar.scss";

const HeaderNavBar = ({ active }) => {
  const [userData, setUserData] = useState();
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");

  const history = useHistory();

  useEffect(() => {
    getUserDetails();
  }, [sessionId]);

  // Log out
  const logout = () => {
    localStorage.clear(history.push("/login"));
    window.location.reload();
  };

  const getUserDetails = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      Api.get(`/api/v1/user/${userId}`, { headers: { userId: userId } })
        .then((res) => {
          const data = res?.data?.usersList;
          setUserData(data);
        })
        .catch((error) => {
          const errorStatus = error?.response?.status;
          if (errorStatus === 401) {
            logout();
          }
        });
    }
  };
  return (
    <div>
      {sessionId ? (
        <div className={active ? "nav-head-main-action" : "nav-head-main"}>
          <div className={active ? "avatar-div" : "avatar-div-action"}>
            {/* <DropdownMenu right className="dropdown-content"> */}
            <div className="avatar-div-action mx-5">
              {/* <Avatar src={noImg} alt="" round={true} size="50px" className="avatar-img" /> */}

              <Nav>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    {/* <Avatar src={noImg} alt="" round={true} size="50px" className="avatar-img" /> */}
                    <div className="d-flex justify-content-start align-items-center">
                      <Tooltip title={userData?.name}>
                        <Avatar round size="50" className="d-flex justify-content-center">
                          <p className="dropdown-option mb-0">{userData?.name?.substring(0, 2)}</p>
                        </Avatar>
                      </Tooltip>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="drop-down-menu logout-text">
                    <DropdownItem
                      className="user-dropitem"
                      to="#"
                      onClick={logout}
                      style={{ cursor: "pointer", zIndex: 0 }}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          </div>
        </div>
      ) : (
        <div className={"nav-head-main"}>
          <div className="header-logo">
            <img src={logo} alt="Snow" className="mx-1 head-nav-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNavBar;
