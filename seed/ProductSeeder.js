var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/myshoppingcart');
var products = [
	new Product({
		imagePath: 'http://www.metalindiamagazine.com/wp-content/uploads/2012/04/dark-princess-russia-gothic-female-metal.jpg',
		title: 'Dark Passion Play',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 500
	}),
	new Product({
		imagePath: 'http://nightwish.com/en/releases/Nightwish---Dark-Passion-Play-2.jpg,thumbnail',
		title: 'Readers poll',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 1200
	}),
	new Product({
		imagePath: 'http://www.metalindiamagazine.com/wp-content/uploads/2012/04/dark-princess-russia-gothic-female-metal.jpg',
		title: 'Dark Passion Play',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 700
	}),
	new Product({
		imagePath: 'http://nightwish.com/en/releases/Nightwish---Dark-Passion-Play-2.jpg,thumbnail',
		title: 'Wishmaster',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 350
	}),
	new Product({
		imagePath: 'http://www.metalindiamagazine.com/wp-content/uploads/2012/04/dark-princess-russia-gothic-female-metal.jpg',
		title: 'Dark Passion Play',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 2100
	}),
	new Product({
		imagePath: 'http://nightwish.com/en/releases/Nightwish---Dark-Passion-Play-2.jpg,thumbnail',
		title: 'Wishmaster',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 150
	}),
	new Product({
		imagePath: 'http://www.metalindiamagazine.com/wp-content/uploads/2012/04/dark-princess-russia-gothic-female-metal.jpg',
		title: 'Dark Passion Play',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 1100
	}),
	new Product({
		imagePath: 'http://nightwish.com/en/releases/Nightwish---Dark-Passion-Play-2.jpg,thumbnail',
		title: 'Wishmaster',
		description: 'Although Nightwish has been popular in Finland since 1997 when they released their debut album, Angels Fall First, they did not achieve worldwide fame until the release of the albums Oceanborn, Wishmaster and Century Child, which were released in 1998, 2000 and 2002, respectively.',
		price: 650
	})
];
var done = 0;
for( var i = 0; i < products.length; i++ ){
	products[i].save(function(error, result){
		done++;
		if( done == products.length )	exit();
	});
}

function exit(){
	mongoose.disconnect();
}