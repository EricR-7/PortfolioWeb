<!-- up to video 40 -->

<?php

include('app/init.php');

$Template->set_data('page_class', 'home');

if(isset($_GET['id']) && is_numeric($_GET['id'])){
    //get products from specific category
    $category = $Categories->get_categories($_GET['id']);

    if(!empty($category)){
        $category_nav = $Categories->create_category_nav($category['name']);
        $Template->set_data('page_nav', $category_nav);

        //get all products from this category
        $cat_products = $Products->create_product_table(4, $_GET['id']);

        if(!empty($cat_products)){
            $Template->set_data('products', $cat_products);
        }

        else{
            //if no products in this category, set alert
            $Template->set_data('products', '<li>No products in this category</li>');
        }
        $Template->load('app/views/v_public_home.php', 'Category: ' . $category['name']);
        exit();
    }

    else{
        //if category does not exist, redirect to home
        $Template->redirect(SITE_PATH);
    }
}

else{
    //get all products


}

//get categorie nav
$category_nav = $Categories->create_category_nav('home');
$Template->set_data('page_nav', $category_nav);


//get products
$products = $Products->create_product_table();


$Template->set_data('products', $products);

//$Template->set_alert('alert!');



$Template->load('app/views/v_public_home.php', 'Welcome!');
