export function AddToCart(id, name, price, quantity, sku, image, variationName, idTaxable) {

    quantity = parseInt(quantity);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartProduct = {
        id: id,
        name: name,
        sku: sku,
        price: price,
        quantity: quantity || 1,
        image: image,
        variation: variationName,
        idTaxable: idTaxable
    };

    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity, 10) + parseInt(quantity, 10);
    } else {
        cart.push(cartProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

}