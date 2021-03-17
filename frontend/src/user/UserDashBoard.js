import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { fullname, email },
  } = isAutheticated();
 

  const userSide = () => {
    return (
      <div>
        <h4 className="center-align">User Profile</h4>
        <Link to ="/weather" className="btn btn-success green">
            View Weather
        </Link>
        <div id="profile-page" className="section">
          <div id="profile-page-header" className="card">
            <div className="card-content red">
              <div className="row light">
                <div className="col s8 center-align">
                  <h4 className="card-title white-text text-darken-4">
                    User Name
                  </h4>
                  <p className="medium-small black-text">{fullname}</p>
                </div>
                <div className="col s3 center-align">
                  <h4 className="card-title white-text text-darken-4">Email</h4>
                  <p className="medium-small black-text">{email}</p>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to User Area"
      description="Manage your data here"
      classNameName="container bg-success p-4"
    >
      <div>
        <div classNameName="col-5">{userSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
