import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
    <nav className="navigation">
        <NavLink to="/">Root</NavLink>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
    </nav>
);
