window.addEventListener('load', (event) => {
    const addToCartButtons = document.querySelectorAll('.addtocardbutton');
   

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)       

    const varukorg = [
        { name: id, quantity: 2 },
        { name: "bananas", quantity: 0 },
        { name: "cherries", quantity: 5 },
      ];
      
      const result = varukorg.find(({ name }) => name === "cherries");
      
      return
      console.log(result); // { name: 'cherries', quantity: 5 }
      



    addToCartButtons.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(addToCartButton) // häm,ta data värdet för produkten    
            cart.push({id: addToCartButton.dataset.product, count: 1}) // lägg till produkt
            localStorage.setItem('cart', JSON.stringify(cart)) // spara i localstorage
        });
    })

});