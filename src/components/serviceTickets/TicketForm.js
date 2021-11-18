import React, { useState } from "react"
import { useHistory } from "react-router";
/*
in this component, useState will be an object with the keys description and emergency.

*/
export const TicketForm = () => {
    const [ticket, update] = useState({
        description: "",
        emergency: false
    });
    const history = useHistory()



    const submitTicket = (evt) => {
        evt.preventDefault()
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            customerId: parseInt(localStorage.getItem("honey_customer")),
            employeeId: 1,
            dateCompleted: ""
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }

        return fetch("http://localhost:8088/serviceTickets", fetchOption)
            .then(res => res.json())
            .then(() => {
                history.push("/serviceTickets")
            })
    }

    /*
    the onChange is bascially an event listener. ...ticket is making a copy of the ticket state,
    whos initial value is empty. copy.description = evt.target.value is saying that now whatever 
    is typed in the form will be the now value of .description. Then it runs the update function 
    with copy as an argument which actually sets whatever you typed into the ticket state.

    The same is happening on the second onchange for the checkbox, except its listenging for 
    if it is checked or not and then return true if checked and false if not. 
    */

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={submitTicket}>
                Submit Ticket
            </button>
        </form>
    )
}
