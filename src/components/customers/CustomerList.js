import React, { useEffect, useState } from "react"

/*
this function below is what's known as a component in react.
Below the component declaration are two state variables used useState,
which is known as a hook. all hooks start with "use".
the first variable (customers) will capture the state and the second
is a function that is used to set the state to customers. the function is a built 
in function that we cannot see.
*/
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState("")
/*
When state is changed a message is broadcast and the hook useEffect listens for it,
just like an event listener. In this case, on page load the useState is changed 
to it's inital vaule, whioch we can see is an empty array, so since state has 
technically been changed, useEffect hears that and runs it's function. useEffect
takes two arguments, a function and an array. In this case, the function is a 
fetch call that grabs the customers in the customers api and then invokes the 
setCustomers function which puts the state in the customers state variable we
defined above.

The second argument of an array watches for a particualr state. In this case, 
and empty array isn't watching any state so it effectivley runs once when the
component is first rendered and then never again.
*/
    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    setCustomers(data)
                })
        },
        []
    )
 
/*
    In this use effect, we passed customers into our array below. Unlike the
    empty array above this is now watching for any changes in customers state
    and when it hears a change it runs the code in the first arguemt, which 
    is a function.
 */

     useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage("You have 1 customer")
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        [customers]
    )

    /*
        You can only return one element from JSX, so you must use a 
        fragment <> </> to wrap you JSX in to use multiple elements. 

        to inerpolate in JSX you just us `{}` instead of `${}`

        React needs a key on every JSX elemet thats rendered and it needs
        to be a unique value. React uses the key attribut to do some internal rendering of the 
        DOM to know which element is which.
    */
    return (
        <>
            <div>{totalCustomerMessage}</div>
            {
                /*
                    .slice only shows a chunk of any array, in this case, only 
                    the first 5 of the array because the first argument is 0, meaning
                    index 0, and the second is 5, which is where it stops but does not include
                    that index posiotion so it's only displaying index 0-4.
                */
                customers.slice(0, 5).map( 
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
                    }
                )
            }
        </>
    )
}
