"use client"
import React from "react"

const Error = ({ message }: { message: string }) => {
  return (
    <div>
      <h1>Snap, something went wrong</h1>
      <p>{message}</p>
    </div>
  )
}

export default Error
