import React, { useState, useEffect } from "react";

function BusinessHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container mx-auto d-flex justify-content-between">
          <a className="navbar-brand" href="/">Service Platform</a>

          
        </div>
      </nav>
      <div>
        <a className="btn btn-primary" href="/business">Business</a>
      </div>
    </header>
  );
}

export default BusinessHeader;
