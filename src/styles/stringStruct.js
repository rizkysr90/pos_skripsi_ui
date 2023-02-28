const styles1 =  `
.pay_change {
    margin-top: 2px;
}
.price-container {
    font-size: 8px;
    margin-top: 5px;
    border-top: 1px solid;
    padding-top: 2px;
}
.pay {
    display: flex;
    justify-content: space-between;

}
.tabs-1 {
    display: flex;
}
.product {
    display: flex;
}
.no {
    flex-basis:5%;
    margin-right: 0.1cm;
}
.name {
    flex-basis: 40%;
    margin-right: 0.1cm;
}
.qty {
    display: flex;
    justify-content: flex-end;
    flex-basis:7%;
    margin-right: 0.1cm;
}
.price {
    flex-basis:24%;
    margin-right: 0.1cm;
    display: flex;
    justify-content: flex-end;
}
.total {
    flex-basis:24%;
    display: flex;
    justify-content: flex-end;
}
.product-list {
    font-size: 8px;
    margin-top: 0.2cm;

}
.trx-info {
   font-size: 8px;
    margin-top: 5px;
    border-top: 1px solid;
    padding-top: 2px;
}
.store-name {
    text-align: center;
}
.store-address {
    font-size: 8px;
    text-align: center;
}
.con-page { 
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    width: 100%;
    height: 100%;
}
@media print {
    
    @page {
      
      size: 58mm 150mm;
      margin: 0.1cm;
      border: solid;
    }
}
`
export default styles1