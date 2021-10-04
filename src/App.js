import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavLink from "react-bootstrap/NavLink";
// import HomePage from "./components/home/HomePage";
import AdminPage from "./components/admin/AdminPage";
import Nav from "./components/layout/Nav";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import DragonDetail from "./components/dragons/DragonDetail";
import DragonList from "./components/dragons/DragonList";
import Contact from "./components/contact/Contact";
import bg from "./image/1.jpg";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <AuthProvider>
      <div className="bg" style={{ backgroundImage: `url(${bg})` }}>
        <Router>
          <div className="header">
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <NavLink to="/">
                  <Navbar.Brand>JS Frameworks | CA</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav />
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
          <Container>
            <Switch>
              <Route path="/" exact>
                <DragonList />
              </Route>
              <Route path="/detail/:id" exact>
                <DragonDetail />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/admin" exact>
                <AdminPage />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
