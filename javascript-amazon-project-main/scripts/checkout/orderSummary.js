import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import {products} from "../../data/products.js";
import {formatcurrency} from "../utils/money.js";
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";

const today=dayjs();
const deliveryDate=today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

    let cartSummaryHTML='';

    cart.forEach((cartItemm)=>{
        const productId=cartItemm.productId;

        let matchingproduct;
        products.forEach((product)=>{
            if(product.id===productId){
                matchingproduct=product;
            }
        });

        const deliveryOptionId=cartItemm.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option)=>{
          if(option.id===deliveryOptionId){
            deliveryOption=option;
          }
        });

        const today=dayjs();
        const deliveryDate=today.add(
          deliveryOption.deliveryDays,'days'
        );
        const dateString=deliveryDate.format(
          'dddd, MMMM D'
        );

        cartSummaryHTML+= `
        <div class="cart-item-container 
        js-cart-item-container-${matchingproduct.id}">
                <div class="delivery-date">
                  Delivery date:${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingproduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingproduct.name}
                    </div>
                    <div class="product-price">
                      $${formatcurrency(matchingproduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItemm.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingproduct,cartItemm)}
                    </div>
                </div>
              </div>
        `;
    });

    function deliveryOptionsHTML(matchingproduct,cartItemm){
      let html='';

      deliveryOptions.forEach((deliveryOption)=>{
        const today=dayjs();
        const deliveryDate=today.add(
          deliveryOption.deliveryDays,'days'
        );
        const dateString=deliveryDate.format(
          'dddd, MMMM D'
        );
        const priceString=deliveryOption.priceCents===0
        ?'FREE'
        :`$${formatcurrency(deliveryOption.priceCents)} -`;
        const isChecked=deliveryOption.id===cartItemm.deliveryOptionId;

        html+=

        `<div class="delivery-option js-delivery-option"
          data-product-id="${matchingproduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
              ${isChecked ?'checked' :''}
                class="delivery-option-input"
                name="delivery-option-${matchingproduct.id}">
              <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                <div class="delivery-option-price">
                      ${priceString} Shipping
                </div>
              </div>
            </div>`
      })
      return html;

    }

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
            removeFromCart(productId);

            const container=document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const{productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
      });
  });
}

