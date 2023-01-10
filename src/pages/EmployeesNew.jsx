import React from 'react'

export default function EmployeesNew() {
  return (
    <div>
        <div className='text-3xl text-primary'>Tambah Pegawai</div>
        <form>
            <div className="form-control w-full max-w-xs mt-4">
                <label className="label" htmlFor="name">
                    <span className="label-text">Nama</span>
                </label>
                <input type="text" placeholder="Nama Karyawan" id="name" name='name' className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs mt-4">
                <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email Karyawan" id="email" name='email' className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs mt-4">
                <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password akun yang akan dibuat" id="password" name='password' className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs mt-4">
                <label className="label" htmlFor="confirm_password">
                    <span className="label-text">Konfirmasi Password</span>
                </label>
                <input type="password" placeholder="Ulangi Password" id="confirm_password" name='confirm_password' className="input input-bordered w-full max-w-xs" />
            </div>
        </form>
    </div>
  )
}
