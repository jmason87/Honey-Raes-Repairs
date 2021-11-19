import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

/*
    the link component has one job, which is to generate anchor tags. the "to" attribute
    is the href path for the anchor tag.
*/

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/serviceTickets">Service Tickets</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("honey_customer")
                    }
                }>
                    Logout</Link>
            </li>
        </ul>
    )
}
