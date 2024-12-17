export const cart=[];

export function addToCart(productId){
    let matchingitem;
      cart.forEach((cartitem)=>{
        if(productId===cartitem.productId)
        {
          matchingitem=cartitem;
        }
      });
      if(matchingitem){
        matchingitem.quantity+=1;
      }
      else{
        cart.push({
          productId:productId,
          quantity:1
        });
      }
  };