import React from "react";

export default function Header({ setActive }) {
    const onClick = (section) => () => setActive(section);

    return (
        <section className="header">
            <ul>
                <li><a href="#components" onClick={onClick("components")}>Components</a></li>
                <li><a href="#applications" onClick={onClick("applications")}>Applications</a></li>
                <li><a href="#desktop" onClick={onClick("desktop")}>Desktop</a></li>
            </ul>
        </section>
    )
}
