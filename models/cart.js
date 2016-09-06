module.exports = function Cart(initCart){
	this.items = initCart.items ? initCart.items : {};
	this.totalQty = initCart.totalQty ? initCart.totalQty : 0;
	this.totalPrice = initCart.totalPrice ? initCart.totalPrice : 0;

	this.add = function(item, id){
		var storedItems = this.items[id];
		if( !storedItems ){
			storedItems = this.items[id] = {
				item: item,
				qty: 0,
				price: 0
			};
		}
		storedItems.qty++;
		storedItems.price = storedItems.item.price * storedItems.qty;
		this.totalQty++;
		this.totalPrice += 	storedItems.item.price;	
	}

	this.generateArray = function(){
		var arr = [];
		for( var id in this.items ){
			arr.push( this.items[id] );
		}
		return arr;
	}

	this.remove = function(id){
		var storedItems = this.items[id];
		storedItems.qty--;
		storedItems.price = storedItems.item.price * storedItems.qty;
		this.totalQty--;
		this.totalPrice -= 	storedItems.item.price;	
		if( storedItems.qty == 0 ){
			delete this.items[id];
		}
	}

	this.destroy = function(){
		this.items = {};
		this.totalQty = 0;
		this.totalPrice = 0;
	}
}