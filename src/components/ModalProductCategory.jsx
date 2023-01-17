import React, { useState } from 'react'

export default function ModalProductCategory(props) {

  return (
    <>
        <div className='flex items-center justify-center w-full 
            min-h-screen z-50 fixed left-0 top-0 bg-neutral lg:ml-44 '>
                <div className='p-8 flex  flex-col items-center bg-base-100 w-2/5'>
                    <div className='text-primary font-bold text-2xl '>{[props?.header]}</div>
                    <form className='mt-4'
                        onSubmit={props.editableData ? (e) => props?.action(e,props.id) : props?.action}
                    >
                        {
                            props.editableData ? 
                            <input type="text" 
                            onChange={(e) => props.editableAction(e.target.value)}
                            value={props.editableData?.name ? props.editableData?.name : ""} 
                            name='name' placeholder="Masukkan Nama Kategori" 
                            className="input input-bordered w-full max-w-xs" /> :
                            <input type="text" name='name' placeholder="Masukkan Nama Kategori" 
                            className="input input-bordered w-full max-w-xs" />
                        }
                        <div className='flex justify-center mt-4'>
                            <button type='reset' className='btn btn-warning mr-4'
                            onClick={() => props.isModalOpen(false)}
                            >Batal</button>
                            {
                                 props.editableData ? 
                                 <button type='submit' className='btn btn-primary'>Simpan data</button>
                                 
                                 :
                                 <button type='submit' className='btn btn-primary'>Tambah</button>
                            }
                        </div>
                    </form>
                </div>
        </div>
    </>
  )
}
