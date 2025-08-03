
<?php

include('app/init.php');

$Template->set_data('page_class', 'shoppingcart');

if(isset($_GET['id']) && is_numeric($_GET['id'])){
    //check if adding a valid item
    if(!$Products->product_exists($_GET['id'])){
        $Template->set_alert('Invalid item!');
        $Template->redirect(SITE_PATH . 'cart.php');
    }

    //add item to the cart
    if(isset($_GET['num']) && is_numeric($_GET['num'])){
        $Cart->add($_GET['id'], $_GET['num']);
        $Template->set_alert('Items added to cart');
    }

    else{
        $Cart->add($_GET['id']);
        $Template->set_alert('Item added to cart');
    }

    $Template->redirect(SITE_PATH . 'cart.php');
}

if(isset($_GET['empty'])){
    $Cart->empty_cart();
    //Global variables
    $Template->set_data('cart_total_items', 0);
     $Template->set_data('cart_total_cost', '0.00');
    $Template->set_alert('Cart emptied');
    $Template->redirect(SITE_PATH . 'cart.php');
}

if(isset($_POST['update'])){
    //get all ids in the product
    $ids = $Cart->get_ids();

    //make sure we have ids
    if($ids != NULL){
        foreach($ids as $id){
            if(is_numeric($_POST['product' . $id])){
                $Cart->update($id, $_POST['product' . $id]);

            }
        }
    }
    //Global variables
    $Template->set_data('cart_total_items', $Cart->get_total_items());
    $Template->set_data('cart_total_cost', $Cart->get_total_cost());

    //add alert
    $Template->set_alert('Number of items updated');
}

//get items in cart 
$display = $Cart->create_cart();
$Template->set_data('cart_rows', $display);

//get categorie nav
$category_nav = $Categories->create_category_nav('');
$Template->set_data('page_nav', $category_nav);


$Template->load('app/views/v_public_cart.php', 'Shopping Cart');



