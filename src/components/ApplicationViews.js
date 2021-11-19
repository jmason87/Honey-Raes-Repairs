import React from "react"
import { Route } from "react-router-dom"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketList } from "./serviceTickets/TicketList"
import { CustomerList} from "./customers/CustomerList"
import { TicketForm } from "./serviceTickets/TicketForm"

/*
    Routes are listening to the url and if the path attribute matches that of the 
    to attribute on the link component it knows to run its child component which 
    we import above.

    The sole responsibility of this module is to pattern match.
*/

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/customers">
                <CustomerList />
            </Route>

            <Route path="/employees">
                <EmployeeList />
            </Route>

            <Route exact path="/serviceTickets">
                <TicketList />
            </Route>

            <Route path="/tickets/create">
                <TicketForm />
            </Route>
        </>
    )
}
