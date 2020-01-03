import React, { Component } from 'react';
import Nav from "./Components/Content/Nav"

export default class App extends Component {
  render() {
    return (

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
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#dashboard"
                      aria-expanded="false" aria-controls="dashboard">
                      <i className="mdi mdi-view-dashboard-outline"></i>
                      <span className="nav-text">Live Score</span> 
                      {/* <b className="caret"></b> */}
                    </a>
                  </li>
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#ui-elements"
                      aria-expanded="false" aria-controls="ui-elements">
                      <i className="mdi mdi-folder-multiple-outline"></i>
                      <span className="nav-text">Vote</span> 
                    </a>
                  </li>
                  <li  className="has-sub" >
                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#charts"
                      aria-expanded="false" aria-controls="charts">
                      <i className="mdi mdi-chart-pie"></i>
                      <span className="nav-text">Profile</span> 
                      {/* <b className="caret"></b> */}
                    </a>
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
          </div>
        </div>


      </div>
    </div>
</div>
    );
  }
}