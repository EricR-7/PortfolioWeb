<?php include("includes/public_header.php"); ?>

<div id="content">
    <h2>Shopping Cart</h2>

    <ul class="alerts">
        <?php $this->get_alerts(); ?>
    </ul>

    <form action="" method="POST">
        <ul class="cart">
            <?php $this->get_data('cart_rows'); ?>
        </ul>

        <div class="buttons_row">
            <a class="button_alt" href="?empty">Empty Cart</a>
            <input type="submit" name="update" class="button_alt" value="Update cart">
        </div>
    </form>

    <?php
    $items = $this->get_data('cart_total_items', FALSE);
    if($items > 0){?>

    <form action="checkout.php" method="POST">
        <div class="submit_row">
            <input type="submit" name="submit" class="button" value="Pay with PayPal">
        </div>
    </form>
    <?php } ?>

</div>

<?php include("includes/public_footer.php"); ?>