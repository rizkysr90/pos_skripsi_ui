import React from 'react'
import { Link } from 'react-router-dom'

export default function Employees() {
  return (
    <div className='flex justify-end'>
        <Link to = "/admin/dashboard/employees/new" className='btn btn-primary text-base-100'>
            Tambah Pegawai
        </Link>
    </div>
  )
}
