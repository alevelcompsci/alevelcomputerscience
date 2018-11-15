var items = [];
var list;
var input;
var addButton;
var removeInput;
var removeButton;

function setup() {
	stroke(0);
	var canvas = createCanvas(800, 800);
	
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y + 50);
	textAlign(CENTER);
	textSize(25);
	input = createInput("");
	removeInput = createInput("");
	input.position(x + 280, 750 + y);
	removeInput.position(input.x, input.y + 30);
	addButton = createButton("Add");
	removeButton = createButton("Remove");
	addButton.position(input.x + input.width, input.y);
	removeButton.position(removeInput.x + removeInput.width, removeInput.y);
	addButton.mousePressed(() => {
		var data = input.value();
		var yValue = 75 + (list.size * 110);
		var xValue = (list.size * 150) + 25;
		list.add(data, xValue, yValue);
		input.value('');
	});
	removeButton.mousePressed(() => {

		if (typeof (removeInput.value) == "number")

			list.remove(removeInput.value());

	})
	list = new LinkedList();
	var datum = "a";
	list.add(datum, 400, 400);
}


function draw() {
	background(255);
	rect(0, 0, width - 10, height - 10);
	list.display();
	textSize(15);
	text("data", 50, 65)
	text("address of next node", 149, 65);


}

function LinkedList() {
	this.root = null;
	this.end = null;
	this.size = 0;
	this.items = [];

	this.display = function () {
		var currentNode = this.root;
		while (currentNode != null) {
			currentNode.display();
			currentNode = currentNode.child;
		}
	}

	this.get = function (num) {
		var currentNode = this.root;
		var i = 0;
		while (i < num) {

			currentNode = currentNode.child;
			i++;

		}
		return currentNode;
	}
	this.add = function (data, x, y) {
		if (this.size == 0) {

			var node = new Node(data, 25, 75);
			this.root = node;
			this.size++;
		}

		if (!input.value() == "") {
			if (this.size < 5) {
				if (this.size == 4) {
					var node = new Node(data, x, y);

				} else {
					var node = new Node(data, x, y);

				}
				var currentNode = this.root;
				while (currentNode.child != null) {
					currentNode = currentNode.child;
				}
				currentNode.child = node;
				this.size++;
			}
		}
		this.calculateIndex();

	}
	this.calculateIndex = function () {
		var currentNode = this.root;
		var i = 1;
		while (currentNode.child != null) {
			currentNode.index = i;
			i++;
			currentNode = currentNode.child;
		}
	}


	this.remove = function (val) {
		if (val == 1) {
			this.root = this.root.child;
			//delete root?
		} else {
			val = Number(val);
			val--;
			var previous = this.get(val - 1);
			var next = this.get(val + 1);
			previous.child = next;
			this.size = this.size - 1;
		}

	}
}

function Node(data, x, y) {
	this.data = data;
	this.child = null;
	this.x = x;
	this.y = y;
	this.index = "null";


	this.display = function () {
		textSize(25);
		rect(x, y, 100, 50);
		rect(x, y, 50, 50);
		if (this.child != null) {
			line(this.x + 100, this.y + 25, this.child.x, this.child.y + 25);
		}
		text(data, x + 30, y + 30);
		textSize(17);
		text(this.index, x + 70, y + 30);
		textSize(25);

	}


}