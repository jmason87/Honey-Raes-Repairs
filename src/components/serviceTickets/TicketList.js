import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

/*
    We use the "expand" query string parameter to add keys of existing objects to a resource.
    In this case we use expand to add an employee key and a customer key to the service tickets resource.
    With this, we now have access to the subkeys in those objects (employee and customer). Since we had
    a customerId and employeeId foreign key in our serviceTickets resource, it knows to match those foriegn keys
    to the unique Id of the new objects that have been added. you can see below on lines 35 and 36 how we then used the new keys.
*/

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
            .then (res => res.json())
            .then((data) => {
                updateTickets(data)
            })
        },
        []
    )

    return (
        <>
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
            {
                tickets.map(
                    (ticket) => {
                        return <div key={`ticket==${ticket.id}`}>
                            <p className={ticket.emergency && `emergency` }>
                            {ticket.emergency ? "🚑" : ""} {ticket.description} submitted by {ticket.customer.name} and worked on by {ticket.employee.name}
                            </p>
                        </div>
                    }
                )
            }
        </>
    )
}

