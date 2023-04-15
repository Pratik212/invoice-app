import React from 'react';
import Link from "next/link";
import Logo from "./logo";
import classes from './main-navigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/contact">Add Invoice</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;