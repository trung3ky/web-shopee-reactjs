export function formatPrice(number: number) {
    const stringNumber = String(number)
    const numberPriceList = stringNumber.split('')
    let newPrice

    if(stringNumber.length > 3) {
        numberPriceList.splice(-3,0,',')
    }
    newPrice = numberPriceList.join('')
    
    return newPrice
}