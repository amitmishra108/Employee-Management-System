import React from 'react';

const HeaderComponent = () => {

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Navbar Brand - Left Aligned */}
          <a className="navbar-brand text-white text-center mx-auto fw-bold" href="#">👨‍💼 Employee Management System</a>

          {/* Buttons inside navbar, styled to match */}
          <div className="d-flex">
          

            {/* Placeholder for future buttons */}
            {/* <button className="btn btn-dark border-light text-white mx-2">Another Button</button> */}
            {/* <button className="btn btn-dark border-light text-white mx-2">Another Button</button> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
