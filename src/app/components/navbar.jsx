"use client";

import Link from "next/link";
import { useState } from "react";
import "./css/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          Time Sports Consultant
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/about">Blog</Link>
          <Link href="/services">About me</Link>
          <Link href="/contact">Subscribe</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}
