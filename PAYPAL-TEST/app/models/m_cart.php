<?php

/*Cart class
handle all tasks related to showing or modifying the shopping cart

The cart keeps track of the user seleted items using a session variable, $_SESSION['cart'].

The session variable holds an array that contains the ids and the number selected of the products.

$_SESSION['cart']['product_id'] = number_selected;
*/

class Cart{
function __contruct(){

}

/*
Getter/Setter
*/

/**
 * return an array of all, products in the cart
 * 
 * @access public
 * @return array,null
 */

public function get(){
    if(isset($_SESSION['cart'])){
        //get all prduct ids in the cart
        $ids = $this->get_ids();

        //use the list of product info
        global $Products;
        return $Products->get($ids);
    }
    return null;
}

/**
 * Get all product ids in the cart
 * 
 * @access public
 * @return array, null
 */ 

public function get_ids(){
    if(isset($_SESSION['cart'])){
        return array_keys($_SESSION['cart']);
    }
    return null;
}


/**
 * Add item to the cart
 * 
 * @access public
 * @param int, int
 * @return null
 */

 public function add($id, $num = 1){
    //set/retrieve up cart
    $cart = array();
    if(isset($_SESSION['cart'])){
        $cart = $_SESSION['cart'];
    }

    //check if item is already in the cart
    if(isset($cart[$id])){
        $cart[$id] = $cart[$id] + $num;
    }

    else{
        //if item is not in the cart
        $cart[$id] = $num;
    }

    $_SESSION['cart'] = $cart;

 }

 /**
  * Update the quanity od a specific item in the cart
    *
    * @access public
    * @param int, int
    * @return null
  */
 public function update($id, $num){
    if($num == 0){
        unset($_SESSION['cart'][$id]);
        if(empty($_SESSION['cart'])){
            unset($_SESSION['cart']);
        }
    }
    else{
        $_SESSION['cart'][$id] = $num;
    }

 }

 /**
  * Empties the cart

    *
    * @access public
    * @return null
  */

 public function empty_cart(){
    unset($_SESSION['cart']);
 }

 /**
  * Return total number of all items in cart
    *
    * @access public
    * @param
    * @return int
  */

 public function get_total_items(){
    $num = 0;
    if(isset($_SESSION['cart'])){
        foreach($_SESSION['cart'] as $item){
            $num = $num + $item;
        }
    }
    return $num;
 }

 /**
  * Return total cost of all items in cart
    *
    * @access public
    * @param
    * @return int
    */

 public function get_total_cost(){
    $num = '0.00';
    if (isset($_SESSION['cart'])){
        //if items to display

        //get ids
        $ids = $this->get_ids();

        //get products
        global $Products;
        $prices = $Products->get_prices($ids);

        //loop through adding the costs of each item x the number of the item in the cart to $num each time
        if($prices != NULL){
            foreach($prices as $price){
                $num += doubleval($price['price'] * $_SESSION['cart'][$price['id']]);
            }
        }
    }
    return $num;
 }

 /**Return shipping cost based on items
  * @access public
  * @param double
  * @return double
  */

 public function get_shipping_cost($total){
    if($total > 200){
        return 40.0;
    }

    else if($total > 50){
        return 15.0;
    }

    else if ($total > 10){
        return 4.0;
    }

    else{
        return 2.0;
    }
 }

 /**
  * Create cart display
  * Returns a string containing list items for each product in the cart
  * 
  * @access public
  * @return string
  */

  public function create_cart(){
    //get products currently in cart
    $products = $this->get();

    $data = '';
    $total = 0;

    $data .= '<li class="header_row"><div class="col1">Product Name: </div><div class="col2">Quantity: </div><div class="col3">
    Price: </div><div class="col4">Total Price: </div></li>';

    if($products != ''){
        //products to display
        $line = 1;
        $shipping = 0;

        foreach($products as $product){
            //create new item in cart
            $data .= '<li';
            if($line % 2 == 0){
                $data .= ' class="alt"';
            }
            $data .= '><div class="col1">' . $product['name'] . '</div>';
            $data .= '<div class="col2"><input name="product' . $product['id'] . '" value="' . $_SESSION['cart'][$product['id']] . '"></div>';
            $data .= '<div class="col3">$' . $product['price'] . '</div>';
            $data .= '<div class="col4">$' . $product['price'] * $_SESSION['cart'][$product['id']] . '</div></li>';

            $shipping += ($this->get_shipping_cost($product['price'] * $_SESSION['cart'][$product['id']]));

            $total += $product['price'] * $_SESSION['cart'][$product['id']];
            $line++;
        }
        //add subtotal row
        $data .= '<li class="subtotal_row"><div class="col1">Total: </div><div class="col2"></div>';

        //shipping
        $data .= '<li class="shipping_row"><div class="col1">Shipping Cost:</div><div class="col2">$' . number_format($shipping, 2) . '</div></li>';

        //Taxes
        if(SHOP_TAX > 0){
            $data .= '<li class="taxes_row"><div class="col1">Tax (' . (SHOP_TAX * 100) .'%):</div><div class="col2">$' . number_format(SHOP_TAX * $total, 2) . '</div></li>';
        }

        //add total row
        $data .= '<li class="total_row"><div class="col1">Total: </div><div class="col2">' . $total += number_format($shipping, 2) + number_format(SHOP_TAX * $total, 2) . '</div>';

    }

    else{
        //no products to display
        $data .= '<li><strong>Your cart is empty</strong></li>';

        //add subtotal row
        $data .= '<li class="subtotal_row"><div class="col1">Total: </div><div class="col2">$0.00</div>';

        $data .= '<li class="shipping_row"><div class="col1">Shipping Cost:</div><div class="col2">$0.00</div></li>';

        //Taxes
        if(SHOP_TAX > 0){
            $data .= '<li class="taxes_row"><div class="col1">Tax (' . (SHOP_TAX * 100) .'%):</div><div class="col2">$0.00</div></li>';
        }

        //add total row
        $data .= '<li class="total_row"><div class="col1">Total: </div><div class="col2">$0.00</div>';
    }

    return $data;
  }


}

