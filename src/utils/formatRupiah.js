function formatRupiah(num) {
    return new Intl.NumberFormat(['ban', 'id']).format(num);
}

export default formatRupiah;