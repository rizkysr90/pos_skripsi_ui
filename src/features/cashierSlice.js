import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//     order : [
//         {
//             name : 'Nama Produk',
//             originPrice : 10000,
//             qty : 10,
//             amount : 1000000
//         }
//     ]
// }
const initialState = {
    products : [],
    total : 0,
    payAmount : 0
}

export const cashierSlice = createSlice({
    name : 'cashier',
    initialState,
    reducers : {
        addProduct : {
            reducer : (state, action) => {
                state.products.push(action.payload) 
            },
            prepare : (text) => {
                const id = nanoid()
                return { payload : {id, text}}
            }
        },
        resetProduct : {
            reducer : (state) => {
                state.products = []
                state.payAmount = 0
                state.total = 0
            }
        },
        modifiedQty : {
            reducer : (state, action) => {
                state.products.forEach((elm) => {
                    if (elm.id === action.payload.id) {
                        elm.text.qty = Number(action.payload.qty);
                        elm.text.amount =  Number(action.payload.qty) *  Number(elm.text.originPrice)
                    }
                })
            }
        },
        destroyProduct : {
            reducer : (state, action) => {
                state.products = state.products.filter((elm) => {
                    return elm.id !== action.payload.id 
                })
            }
        },
        sumOrders : {
            reducer : (state, action) => {
                state.total = action.payload.sumPrice
            }
        },
        payAmount : {
            reducer : (state, action) => {
                state.payAmount = Number(action.payload.pay)
            }
        }
    }
})


export const {addProduct, resetProduct, modifiedQty, destroyProduct, sumOrders,payAmount} = cashierSlice.actions;
export default cashierSlice.reducer;