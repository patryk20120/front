var productName = "";
var productCode = "";
var variantPrice = 0;
var versionPrice = 0;
var productItems = [];
var productMultiversions = [];
var splide;
$(document).ready(function() {
    splide = new Splide('.splide', {
        width: "100%",
        rewind: true,
        pagination: false,
    }).mount();


    $('#activatePopup').on('click', function() {
        //alert();
    });

    $('#qtyMinus').on('click', function() {
        var input = $("#productQty");
        var qty = parseInt(input.val()) - 1;
        if (qty > 0) {
            input.val(qty);
        }
    });

    $('#qtyPlus').on('click', function() {
        var input = $("#productQty");
        var qty = parseInt(input.val()) + 1;
        input.val(qty);
    });


    setTimeout(loadExternalData, 100);

    $(document).on("click", ".variantSelect", function() {
        var variantID = $(this).attr("id");
        variantPrice = productItems[variantID][0].price;
        var price = variantPrice + versionPrice;
        $('.productPrice').html(price.toFixed(2).toString().replace(".", ",") + " zł");

        if (productItems[variantID][0].amount <= 0) {
            changeProductStatus(false);
        } else {
            changeProductStatus(true);
        }
    });

    $(document).on("change", "#multiversionsSelect", function() {
        var versionID = $(this).val();
        versionPrice = parseFloat(productMultiversions[versionID][0].price_difference);
        var price = variantPrice + versionPrice;
        $('.productPrice').html(price.toFixed(2).toString().replace(".", ",") + " zł");
        splide.go(versionID);
    });

});

function changeProductStatus(status) {
    if (status == true) {
        $('.productStatus').html('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="11.497" viewBox="0 0 15 11.497"><path id="ok" d="M17.176,8.206a.9.9,0,0,1-.277.659L8.575,17.189a.965.965,0,0,1-1.318,0L2.436,12.368a.965.965,0,0,1,0-1.318L3.754,9.732a.921.921,0,0,1,1.318,0l2.844,2.861,6.347-6.364a.921.921,0,0,1,1.318,0L16.9,7.547a.864.864,0,0,1,.277.659Z" transform="translate(-2.176 -5.952)" fill="#5cba0e"/></svg> Produkt dostępny');
        $('.productShipment').show();
        $('.qty-form').show();
        $('.btnAddToBasket').show();
    } else {
        $('.productStatus').html('<svg xmlns="http://www.w3.org/2000/svg" width="11.091" height="11.096" viewBox="0 0 11.091 11.096"><path id="_211652_close_icon" data-name="211652_close_icon" d="M74.915,73.526l-3.789-3.8,3.8-3.755a.4.4,0,0,0,0-.566l-1.08-1.086a.4.4,0,0,0-.283-.116.41.41,0,0,0-.283.116L69.5,68.059l-3.786-3.74a.4.4,0,0,0-.283-.116.41.41,0,0,0-.283.116L64.067,65.4a.4.4,0,0,0,0,.566l3.8,3.755-3.786,3.8a.4.4,0,0,0-.118.283.388.388,0,0,0,.118.283l1.08,1.086a.4.4,0,0,0,.283.118.391.391,0,0,0,.283-.118L69.5,71.389l3.775,3.786a.4.4,0,0,0,.283.118.391.391,0,0,0,.283-.118l1.08-1.086a.4.4,0,0,0,.118-.283A.414.414,0,0,0,74.915,73.526Z" transform="translate(-63.95 -64.2)" fill="#e50000"/></svg> Produkt niedostępny');
        $('.productShipment').hide();
        $('.qty-form').hide();
        $('.btnAddToBasket').hide();
    }
}

function loadExternalData() {
    $.getJSON("./assets/data/xbox.json", function(data) {
        productName = data.product.name;
        productCode = data.product.code;

        loadProductData();

        var productSizes = data.sizes.items;
        $.each(productSizes, function(key, val) {
            var tmp = [{
                "type": val.type,
                "name": val.name,
                "amount": val.amount,
                "price": val.price
            }];
            productItems.push(tmp);
        });

        var multiversions = data.multiversions;
        $.each(multiversions, function(key, val) {
            $.each(val.items, function(key2, val2) {
                var MultiVersionName = "";
                $.each(val2.values, function(key3, val3) {
                    MultiVersionName = val3.name;
                });
                var tmp = [{
                    "id": val2.values_id,
                    "name": MultiVersionName,
                    "price_difference": val2.products[0].price_difference
                }];
                productMultiversions.push(tmp);
            });
        });
        loadVariants();
        loadMultiversions();

        var versionID = $("#multiversionsSelect").val();
        versionPrice = parseFloat(productMultiversions[versionID][0].price_difference);
        var price = variantPrice + versionPrice;
        $('.productPrice').html(price.toFixed(2).toString().replace(".", ",") + " zł");

        var variantID = $(".variantSelect").attr("id");
        variantPrice = productItems[variantID][0].price;
        var price = variantPrice + versionPrice;
        $('.productPrice').html(price.toFixed(2).toString().replace(".", ",") + " zł");

        if (productItems[variantID][0].amount <= 0) {
            changeProductStatus(false);
        } else {
            changeProductStatus(true);
        }
    });
}

function loadProductData() {
    $(".productName").html(productName);
    var price = variantPrice + versionPrice;
    $('.productPrice').html(price.toFixed(2).toString().replace(".", ",") + " zł");
}

function loadVariants() {
    var select = $("#variantsSelect");
    select.html("");
    var first = false;
    $.each(productItems, function(key, val) {
        if (first == false) {
            select.append("<label class='btn btn-outline active optionButton'><input name='size' value='" + val[0].name + "' type='radio' name='options' id='" + key + "' autocomplete='off' checked class='variantSelect'>" + val[0].name + "</label>");
            first = true;
        } else {
            select.append("<label class='btn btn-outline optionButton'><input name='size' value='" + val[0].name + "' type='radio' name='options' id='" + key + "' autocomplete='off' class='variantSelect'>" + val[0].name + "</label>");
        }
    });
}

function loadMultiversions() {
    var select = $("#multiversionsSelect");
    select.html("");
    $.each(productMultiversions, function(key, val) {
        select.append("<option value='" + key + "'>" + val[0].name + "</option>");
    });
}