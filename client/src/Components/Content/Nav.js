import React, { Component } from 'react';
import Identicon from 'identicon.js';
export default class Nav extends Component {
  constructor(props) {
    super(props);
    
  }
  
    render() {
        return (
            <nav className="navbar navbar-static-top navbar-expand-lg">
            {/* <!-- Sidebar toggle button --> */}
            <button id="sidebar-toggler" className="sidebar-toggle">
              <span className="sr-only">Toggle navigation</span>
            </button>
            {/* <!-- search form --> */}
            <div className="search-form d-none d-lg-inline-block">
              {/* <div className="input-group">
                <button type="button" name="search" id="search-btn" className="btn btn-flat">
                  <i className="mdi mdi-magnify"></i>
                </button>
                <input type="text" name="query" id="search-input" className="form-control" placeholder="'button', 'chart' etc."
                  autoFocus autoComplete="off" />
              </div>
              <div id="search-results-container">
                <ul id="search-results"></ul>
              </div> */}
            </div>

            <div className="navbar-right ">
              <ul className="nav navbar-nav">
                {/* <!-- Github Link Button --> */}
                {/* <li className="github-link mr-3">
                  <a className="btn btn-outline-secondary btn-sm" href="https://github.com/tafcoder/sleek-dashboard" target="_blank">
                    <span className="d-none d-md-inline-block mr-2">Source Code</span>
                    <i className="mdi mdi-github-circle"></i>
                  </a>
                </li> */}

                 <li className="dropdown notifications-menu">
                  {/* <button className="dropdown-toggle" data-toggle="dropdown">
                    <i className="mdi mdi-bell-outline"></i>
                  </button> */}
                  <ul className="dropdown-menu dropdown-menu-right">
                    {/* <li className="dropdown-header">You have 5 notifications</li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-account-plus"></i> New user registered
                        <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#">
                        <i className="mdi mdi-account-remove"></i> User deleted
                        <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 07 AM</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#">
                        <i className="mdi mdi-chart-areaspline"></i> Sales report is ready
                        <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 12 PM</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#">
                        <i className="mdi mdi-account-supervisor"></i> New client
                        <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 10 AM</span>
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#">
                        <i className="mdi mdi-server-network-off"></i> Server overloaded
                        <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline"></i> 05 AM</span>
                      </a>
                    </li> */}
                    {/* <li className="dropdown-footer">
                      <a className="text-center" href="#"> View All </a>
                    </li> */}
                  </ul>
                </li>
                {/* <!-- User Account --> */}
                <li className="dropdown user-menu">
                  <button href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                  {this.props.account
             ? <img className="ml-2" 
             width="30"
             height="30"
             src={`data:image/png;base64, ${ new Identicon(this.props.account, 30).toString()}`}
             />
             : <span> </span>
            }                  <span className="d-none d-lg-inline-block">{this.props.account}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right">
                    {/* <!-- User image --> */}
                    {/* <li className="dropdown-header">
                      <img src="assets/img/user/user.png" className="img-circle" alt="User Image" />
                      <div className="d-inline-block">
                        Abdus Salam <small className="pt-1">abdus@gmail.com</small>
                      </div>
                    </li> */}
                    {/* <li>
                      <a href="profile.html">
                        <i className="mdi mdi-account"></i> My Profile
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="email-inbox.html">
                        <i className="mdi mdi-email"></i> Message
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#"> <i className="mdi mdi-diamond-stone"></i> Projects </a>
                    </li>
                    <li>
                      <a href="#"> <i className="mdi mdi-settings"></i> Account Setting </a>
                    </li>
 */}
                    {/* <li className="dropdown-footer">
                      <a href="signin.html"> <i className="mdi mdi-logout"></i> Log Out </a>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        );
    }
}