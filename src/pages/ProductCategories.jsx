import React, { useState } from 'react'

export default function ProductCategories() {
    const [productCategories, setProductCategories] = useState('');
  return (
    <>
        <div className='flex justify-between'>
            <div className='font-bold text-lg text-neutral'>N Kategori</div>
            <div className='btn btn-primary hover:text-white'>
                Tambah Kategori
            </div>
        </div>
        <div className="overflow-x-auto mt-10">
            <table className="table w-full">
                <thead>
                <tr>
                    <th></th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </>
  )
}
