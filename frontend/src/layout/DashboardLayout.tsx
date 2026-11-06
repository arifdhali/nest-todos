import React from 'react'
import { Navigate, Outlet } from 'react-router'

const DashboardLayout = () => {
    let auth = false;

    if (!auth) {
        return Navigate({ to: "/", replace: true })
    }
    console.log(auth)
    return (
        <>
            <div>DashboardLayout</div>
            <Outlet />
        </>
    )
}

export default DashboardLayout