import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])
    const [specialties, setSpecial] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
        },
        []
    )

    useEffect(() => {
        /*
            In this useEffect we are mapping through th emeployees array from line 4

        */
       const justSpecialties = employees.map(
           (employeeObj) => employeeObj.specialty)
            setSpecial(justSpecialties.join(", "))
    }, [employees])

    return (
        <>
            <div>
                Specialties: { specialties }
            </div>
            {
                employees.map(
                    (employee) => {
                        return <p key={`employee--${employee.id}`}><Link to={`/employee/${employee.id}`}>{employee.name}</Link></p>
                    }
                )
            }
        </>
    )
}
