import React, { useState, useEffect, } from "react";
import { useParams, useHistory } from "react-router-dom";

export const Ticket = () => {
        const [ ticket, assignTicket ] = useState({})
        const [ employee, setEmployees] = useState([])
        const { ticketId } = useParams()
        const history = useHistory()

        useEffect(
            () => {
                return fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                    .then(res => res.json())
                    .then((data) => {
                        assignTicket(data)
                    })
            },
            [ ticketId ]
        )

        useEffect(
            () => {
                return fetch("http://localhost:8088/employees")
                    .then (res => res.json())
                    .then((data) => {
                        setEmployees(data)
                    })
            },
            []
        )

        const assingEmployee = (evt) => {
            const newServiceTicketObject = {
                "customerId": parseInt(localStorage.getItem("honey_customer")),
                "employeeId": parseInt(evt.target.value),
                "description": ticket.description,
                "emergency": ticket.emergency,
                "dateCompleted": ticket.dateCompleted
            }


            return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newServiceTicketObject)
            })
            
                .then(() => {
                    history.push("/serviceTickets")
                })
        }


    return (
        <>
            <h2>Ticket {ticketId} Details</h2>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">
                    <select id="employee" onChange={assingEmployee}>
                        {
                            employee.map(
                                (employee) => {
                                    return <option value={employee.id} key={`employee--${employee.id}`}>
                                        {employee.name}
                                        </option>
                                }
                            )
                        }
                    </select>
                </div>
            </section>
        </>
    )
}