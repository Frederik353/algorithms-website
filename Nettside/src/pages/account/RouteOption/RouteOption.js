
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../../helpers/authentication-context"

export function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/signIn" />
            }}
        ></Route>
    )
}

export function PublicRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Redirect to="/questions"/> :  <Component {...props} />
            }}
        ></Route>
    )
}