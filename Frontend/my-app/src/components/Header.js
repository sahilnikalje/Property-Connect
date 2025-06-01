"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          PropertyConnect
        </Link>

        <nav className="nav">
          <Link to="/properties" className="nav-link">
            Properties
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
