import React, { useState, useEffect } from "react";

function CleanTouchHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container mx-auto d-flex justify-content-between">
          <a className="navbar-brand" href="/">Clean Touch</a>

          <div className="d-flex">
            <div id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/clean_touch">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/clean_touch/aboutUs">About us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signIn">Sign in</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signUp">Sign up</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
      <div>
        <a className="btn btn-primary" href="/business">Business</a>
      </div>
    </header>
  );
}

export default CleanTouchHeader;
