export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=
  [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
  }];
};


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function addToCart(productId){
    let matchingitem;
      cart.forEach((cartItemm)=>{
        if(productId===cartItemm.productId)
        {
          matchingitem=cartItemm;
        }
      });
      if(matchingitem){
        matchingitem.quantity+=1;
      }
      else{
        cart.push({
          productId: productId,
          quantity:1,
          deliveryOptionId:'1'
        });
      }
      saveToStorage();
  };

export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItemm)=>{
    if(cartItemm.productId !== productId){
      newCart.push(cartItemm);
    }
  });
  cart=newCart;

  saveToStorage();
};

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingitem;
  cart.forEach((cartItemm)=>{
    if(productId===cartItemm.productId)
    {
      matchingitem=cartItemm;
    }
  });

  matchingitem.deliveryOptionId=deliveryOptionId;
  saveToStorage();
}