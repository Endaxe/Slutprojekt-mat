window.addEventListener('load', (event) => {
    // När jag clickar så ska jag få ut vilken produkt jag väljer (id, namn, antal)
    // Detta ska värderna ska sparas i local storage
    const addToCartButtons = document.querySelectorAll('.addtocardbutton');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)

    addToCartButtons.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(addToCartButton) // häm,ta data värdet för produkten   
            const product = cart.find(product => product.id === addToCartButton.dataset.product)
            //cart.push({ id: addToCartButton.dataset.product, count: 1 })
            
            if (product) {
                product.count++
            } else {
                cart.push({ id: addToCartButton.dataset.product, count: 1 })
            }
            const product2 = cart.find(product => product.id === addToCartButton.dataset.product)
            console.log(product2) // vad händer om produkten inte är i localstorage ännu
            
            // om profukten redan finns i cart, öka count
            // cart.find du har id på produkten sök efter id i cart
            // annars så lägg till den 
//            cart.push({ id: addToCartButton.dataset.product, count: 1 }) // lägg till produkt
            localStorage.setItem('cart', JSON.stringify(cart)) // spara i localstorage
        });
    })
});