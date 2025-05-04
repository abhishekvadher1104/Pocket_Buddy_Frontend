import React from 'react'
import { Outlet } from 'react-router-dom'

const Restro = () => {
  return (
    <div>
      <h1>This is restro...</h1>
    <main className="app-main">
    <Outlet>
    </Outlet>
  </main>
    </div>
  )
}

export default Restro
