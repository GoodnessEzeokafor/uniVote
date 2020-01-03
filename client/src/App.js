import React, { Component } from 'react';
import Nav from "./Components/Content/Nav"
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from"./Components/Content/Home"
import Score from"./Components/Content/Score"
import Vote from "./Components/Content/Vote"
import Profile from "./Components/Profile/Dashboard"


export default class App extends Component {
  render() {
    return (
<Router>
      <div>
      <div className="mobile-sticky-body-overlay"></div>

    <div className="wrapper">
      
              {/* <!--
          ====================================
          ——— LEFT SIDEBAR WITH FOOTER
          =====================================
        --> */}
        <aside className="left-sidebar bg-sidebar">
          <div id="sidebar" className="sidebar sidebar-with-footer">
            {/* <!-- Aplication Brand -->
             */}
            <div className="app-brand">
              <a href="/">
                <svg
                  className="brand-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  width="30"
                  height="33"
                  viewBox="0 0 30 33"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      className="logo-fill-blue"
                      fill="#7DBCFF"
                      d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                    />
                    <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
                  </g>
                </svg>
                <span className="brand-name">Sleek Dashboard</span>
              </a>
            </div>
            {/* <!-- begin sidebar scrollbar --> */}
            <div className="sidebar-scrollbar">

              {/* <!-- sidebar menu --> */}
              <ul className="nav sidebar-inner" id="sidebar-menu">
              <li  className="has-sub active expand" >
                    <Link className="sidenav-item-link" to="/">
                      <i className="mdi mdi-view-dashboard-outline"></i>
                      <span className="nav-text">Home</span> 
                      {/* <b className="caret"></b> */}
                    </Link>
                  </li>
                  <li  className="has-sub active expand" >
                    <Link className="sidenav-item-link" to="/score">
                      <i className="mdi mdi-view-dashboard-outline"></i>
                      <span className="nav-text">Live Score</span> 
                      {/* <b className="caret"></b> */}
                    </Link>
                  </li>
                  <li  className="has-sub" >
                    <Link className="sidenav-item-link" to="/vote">
                      <i className="mdi mdi-folder-multiple-outline"></i>
                      <span className="nav-text">Vote</span> 
                    </Link>
                  </li>
                  <li  className="has-sub" >
                    <Link className="sidenav-item-link" to="/profile">
                      <i className="mdi mdi-chart-pie"></i>
                      <span className="nav-text">Profile</span> 
                      {/* <b className="caret"></b> */}
                    </Link>
                  </li>        
              </ul>
            </div>
            {/* <hr className="separator" /> */}
          </div>
        </aside>
      <div className="page-wrapper">
                  {/* <!-- Header --> */}
          <header className="main-header " id="header">
             <Nav />
          </header>


        <div className="content-wrapper">
          <div className="content">	
          <Switch>
            <Route path="/score">
                <Score />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/vote">
                <Vote />
            </Route>
            
            <Route path="/">
                <Home />
            </Route>
            
          </Switch>
          </div>
        </div>


      </div>
    </div>
</div>
</Router>
    );
 
  }
}