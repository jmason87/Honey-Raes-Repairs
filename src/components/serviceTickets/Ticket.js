import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Ticket = () => {
        const [ ticket, assignTicket ] = useState({})
        const { ticketId } = useParams()

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
    return (
        <>
            <h2>Ticket {ticketId} Details</h2>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">Assigned to {ticket.employee?.name}</div>
            </section>
        </>
    )
}