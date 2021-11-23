import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

export const Employee = () => {
    const [ employee, setEmp ] = useState({})
    const { employeeId } = useParams()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/employees/${employeeId}`)
                .then(res => res.json())
                .then((data) => {
                    setEmp(data)
                })
        },
        [ employeeId ]
    )

    return (
        <>
            <h2>{employee.name}</h2>
            <div>Specialty is {employee.specialty}</div>
        </>

    )
}