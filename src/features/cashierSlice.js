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
                let flagSameProduct = false;
                state.products = state.products.map(data => {
                    if (data.product_id === action.payload.product_id) {
                        flagSameProduct = true;
                        return {
                            ...data, 
                            qty : data.qty + action.payload.qty,
                            amount : data.amount + action.payload.amount
                        }
                    } else {
                        return data;
                    }
                })
                if (!flagSameProduct) {
                    state.products.push(action.payload) 
                }
            }
            // prepare : (text) => {
            //     const id = nanoid()
            //     return { payload : {id, text}}
            // }
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
                state.products = state.products.map((elm) => {
                    if (elm.product_id === action.payload.id) {
                        elm.qty = Number(action.payload.qty);
                        elm.amount =  Number(action.payload.qty) *  Number(elm.originPrice)

                        return elm;
                    } else {
                        return elm;
                    }
                })
            }
        },
        destroyProduct : {
            reducer : (state, action) => {
                state.products = state.products.filter((elm) => {
                    return elm.product_id !== action.payload.id 
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