var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Order = require('../models/order');
var Cart = require('../models/cart');
/* GET home page. */
router.get('/', function(req, res, next) {

	var successMsg = req.flash('success')[0];
	Product.find(function( error, docs ){
		var productsRow = [];
		var colSize = 3;
		for( var i = 0; i < docs.length; i += colSize ){
			productsRow[i] = docs.slice( i, i + colSize) ;
		}
		res.render('shop/index', { title: 'My Shopping cart',  procucts: productsRow, successMsg: successMsg, noMessage: !successMsg});
	});
});

router.get('/add-to-cart/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {items: {}, totalQty:0, totalPrice:0} );
	Product.findById(productId, function(error, product){
		if( error ){
			res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		req.flash('success', 'Successfully Added to Card')
		res.redirect('/');
	})
});

router.get('/reduceItem/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart);
	cart.remove(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/remove-cart/', function(req, res, next) {
	var cart = new Cart(req.session.cart ? req.session.cart : { items:{}, totalQty:0, totalPrice:0 } );
	cart.destroy();
	next();
});

router.get('/shopping-cart/', function(req, res, next) {
	if( !req.session.cart ){
		res.render('shop/shopping-cart', {product: null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {title: 'Your cart', product: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout/', isLoggedIn, function(req, res, next) {
	if( !req.session.cart ){
		res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash('error')[0];
	res.render('shop/checkout', {title: 'Checkout',totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout/', isLoggedIn, function(req, res, next) {
	if( !req.session.cart ){
		res.render('shop/shopping-cart', {product: null});
	}
	var cart = new Cart(req.session.cart);
	var stripe = require('stripe')(
	  "sk_test_PcTq3dfQOtF2RD3TBgjuKKwX"
	);
	stripe.charges.create({
	  amount: cart.totalPrice * 100,
	  currency: "inr",
	  source: req.body.stripeToken, // obtained with Stripe.js
	  description: "Test Charge"
	}, function(err, charge) {
	  if(err){
	  	req.flash('error', err.message);
	  	return res.redirect('/checkout');
	  }
	  var order = new Order({
	  	user: req.user,
	  	cart: cart,
	  	address: req.body.address,
	  	name: req.body.name,
	  	paymentId: charge.id
	  });
	  order.save(function(err, result){
	  	if(err)	{
	  		req.flash('error', err.message);
	  	}else{
			req.flash('success', 'Payment Successful');
			req.session.cart = null;
			res.redirect('/');
	  	}		
	  });
	  
	});
});
module.exports = router;

function isLoggedIn(req, res, next){
	if( req.isAuthenticated()  ){
		return next();
	}	
	req.session.oldUrl = req.url;
	res.redirect('/user/signin');
}
