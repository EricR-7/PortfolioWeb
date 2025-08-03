<?php

/*
    INIT
    Basic configs

*/

//Connect to db
$server = "localhost";
$user = 'root';
$pass = '';
$db = 'ks_shop';

$Database = new mySqli($server, $user, $pass, $db);

//error reporting
mysqli_report(MYSQLI_REPORT_ERROR);
ini_set('display_errors', 1);

//set up constants
define('SITE_NAME', 'Eric\'s Shop');
define('SITE_PATH', 'http://localhost:8888/paypal/');
define('IMAGE_PATH', 'http://localhost:8888/paypal/resources/images/');

//Tax
define('SHOP_TAX', '0.10');

//Paypal
define('PAYPAL_MODE', 'SANDBOX'); //Either sandbox or live
define('PAYPAL_CURRENCY', 'AUD');
define('PAYPAL_DEVID', 'AS-Bspp3kDdSeCiyC15EarYjog5Rb391UVfYck1_JGKwiTXkmjm6vporj7RQnFlivyx1IzowwDM1IS9n');
define('PAYPAL_DEVSECRET', 'EDAfMORqbadeLhuLcPrTPRJWtT9BgGo-IpsQlh_j3EMYApSQ59_f-wpbh2RekTS0wgJhMP_d-k3jFLZs');
define('DEV_LIVEID', '');
define('DEV_LIVESECRET', '');


//Include objects
include('app/models/m_template.php');
include('app/models/m_categories.php');
include('app/models/m_products.php');
include('app/models/m_cart.php');


//Create objects
$Template = new Template();
$Categories = new Categories();
$Products = new Products();
$Cart = new Cart();


//SEssion start
session_start();

//Global variables
$Template->set_data('cart_total_items', $Cart->get_total_items());
$Template->set_data('cart_total_cost', $Cart->get_total_cost());