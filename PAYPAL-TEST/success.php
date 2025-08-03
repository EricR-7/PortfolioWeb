<?php

include('app/init.php');
$Template->set_data('page_class', 'success');

$Cart->empty_cart();
$Template->set_data('cart_total_items', 0);
$Template->set_data('cart_total_cost', '0.00');

$category_nav = $Categories->create_category_nav('');
$Template->set_data('page_nav', $category_nav);

$Template->load('app/views/v_public_success.php', 'Thanks!');


