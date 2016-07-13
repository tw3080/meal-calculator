document.addEventListener("DOMContentLoaded", function(event) {

    /* DINER STUFF */

    // Diner constructor
    function Diner(name) {
        this.name = name;
        this.items = [];
    }

    // Add items to a diner's meal
    Diner.prototype.addItem = function(name, cost) {
        this.items.push({name: name, cost: cost});
    };

    // Get the subtotal for each diner's meal
    Diner.prototype.getSubtotal = function() {
        this.subtotal = 0;
        this.items.forEach(function(item, index, array) {
            this.subtotal += item.cost;
        }, this);
        // console.log(this.subtotal);
        return this.subtotal;
    };

    // Get each diner's bill
    Diner.prototype.getBill = function(tax, tip) {
        console.log(this.name + "'s bill");
        this.items.forEach(function(item, index, array) {
            console.log(new Array(item.name + ': $' + item.cost));
        }, this);
        // TODO: not sure if this needs to be an array
        console.log(new Array('Subtotal: $' + this.subtotal));
        console.log(new Array('Tax: $' + (this.subtotal * tax).toFixed(2)));
        console.log(new Array('Tip: $' + (this.subtotal * tip).toFixed(2)));
        var total = Number(this.subtotal) + Number((this.subtotal * tax).toFixed(2)) + Number((this.subtotal * tip).toFixed(2));
        console.log('Total: $' + total.toFixed(2));
    };

    /* BILL STUFF */

    // Bill constructor
    function Bill() {
        this.diners = [];
        this.tax = 0.095;
        this.tip = 0.2;
    }

    // Add a diner to the bill
    Bill.prototype.addDiner = function(dinerName) {
        this.diners.push(dinerName);
    };

    // Calculate bill
    Bill.prototype.calculate = function() {
            this.subtotal = 0;
            this.diners.forEach(function(dinerName, index, array) {
                this.subtotal += dinerName.getSubtotal();
            }, this);

            // TODO: not sure if toFixed is needed here
            this.taxAmt = Number((this.subtotal * this.tax).toFixed(2));
            this.tipAmt = Number((this.subtotal * this.tip).toFixed(2));
            this.total = this.subtotal + Number(this.taxAmt) + Number(this.tipAmt);
    };

    // Print bills
    Bill.prototype.printBill = function() {
        console.log('---------------------');
        console.log('TOTAL BILL');
        console.log('---------------------');
        this.diners.forEach(function(dinerName, index, array) {
            dinerName.items.forEach(function(item, index, array) {
                console.log(new Array(item.name + ': $' + item.cost));
            }, this);
        }, this);
        console.log('---------------------');
        console.log('Subtotal: $' + this.subtotal);
        console.log('Tax (' + (this.tax * 100).toFixed(2) + '%): $' + this.taxAmt);
        console.log('Gratuity (' + (this.tip * 100).toFixed(2) + '%): $' + this.tipAmt.toFixed(2));
        console.log('Total: $' + this.total);
    };

    // Bill breakdown per diner
    Bill.prototype.getBreakdown = function() {
        console.log('---------------------');
        console.log('COST PER PERSON');
        console.log('---------------------');
        this.diners.forEach(function(dinerName, index, array) {
            dinerName.getBill(this.tax, this.tipAmt / this.diners.length);
        }, this);
    };

    /* APP STUFF */

    var bill = new Bill();

    // Add diners and each diner's items
    var taylor = new Diner('Taylor');
    taylor.addItem('glass of riesling', 7.99);
    taylor.addItem('side salad', 4.99);
    taylor.addItem('fettucine alfredo', 12.99);
    taylor.addItem('scoop of gelato', 2.99);
    bill.addDiner(taylor);
    /*
    taylor.getSubtotal();
    // console.log(taylor.items);
    taylor.getBill(0.095, 0.2);
    */

    var david = new Diner('David');
    david.addItem('garlic bread', 2.99);
    david.addItem('spaghetti with meatballs', 14.99);
    david.addItem('slice of lemon cake', 6.99);
    bill.addDiner(david);
    /*
    david.getSubtotal();
    // console.log(david.items);
    david.getBill(0.095, 0.2);
    */

    bill.calculate();
    bill.printBill();
    // TODO: getBreakdown() is giving the wrong totals
    bill.getBreakdown();

});
