var btree;
var input;
var inputButton;
var timeAmount = 10000;
var testButton;
var deleteButton;

function setup() {
	var canvas = createCanvas(1800, 600);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
	textSize(25);
	btree = new BinaryTree();
	input = createInput("");
	input.position(x + 780, y + 500);
	inputButton = createButton('add');
	testButton = createButton('Create example tree');
	deleteButton = createButton('Delete Tree');
	inputButton.position(input.x + input.width, input.y);

	testButton.position(input.x + input.width, input.y + input.height);
	deleteButton.position(testButton.x, testButton.y + testButton.height);
	deleteButton.mousePressed(() => btree.delete());
	testButton.mousePressed(() =>

		{
			btree.delete();
			btree.add('8');
			btree.add('4');
			btree.add('2');
			btree.add('1');
			btree.add('6');
			btree.add('3');
			btree.add('5');
			btree.add('7');
			btree.add('16');
			btree.add('32');
			btree.add('64');
			btree.add('12');
			btree.add('24');
			btree.add('10');
			btree.add('14');
		});
	inputButton.mousePressed(() => {
		btree.add(input.value());
		input.value('');
	});
}

function draw() {
	background(255);
	rect(0, 0, width - 10, height - 10);
	btree.display(btree.root);
}

function Node(data) {
	this.data = data;
	this.x = 0;
	this.y = 0;
	this.leftChild = null;
	this.rightChild = null;
	this.level = 0;
	this.parent = null;


	this.display = function () {
		rect(this.x, this.y, 100, 40);
		text(data, this.x + 46, this.y + 30);
		if (this.leftChild != null) {
			line(this.x + 50, this.y + 40, this.leftChild.x + 50, this.leftChild.y);
		}
		if (this.rightChild != null) {
			line(this.x + 50, this.y + 40, this.rightChild.x + 50, this.rightChild.y);
		}
	}
	this.add = function (data) {
		if (this.level < 4) {
			if (this.data != data) {
				if (data < this.data) {
					if (this.leftChild == null) {
						this.leftChild = new Node(data);
						this.leftChild.level = this.level + 1;

						if (this.leftChild.level > 1) {
							this.leftChild.x = this.x - 240 + (this.leftChild.level * 60);
							this.leftChild.y = this.y + 100;
						} else {
							this.leftChild.x = this.x - 250;
							this.leftChild.y = this.y + 100;
						}
					} else {
						this.leftChild.add(data);
					}


				}
				if (data > this.data) {
					if (this.rightChild == null) {
						this.rightChild = new Node(data);
						this.rightChild.level = this.level + 1;
						if (this.rightChild.level > 1) {
							this.rightChild.x = this.x + 240 - (this.rightChild.level * 60);
							this.rightChild.y = this.y + 100;
						} else {
							this.rightChild.x = this.x + 250;
							this.rightChild.y = this.y + 100;
						}

					} else {
						this.rightChild.add(data);
					}
				}
			}
		}
	}
}

function BinaryTree() {
	this.root = null;

	this.display = function (rootNode) {
		if (rootNode != null) {
			rootNode.display();
			this.display(rootNode.leftChild);
			this.display(rootNode.rightChild);
		}
	}
	this.delete = function () {
		this.root = null;
	}
	this.add = function (data) {
		if (!isNaN(data)) {
			data = Number(data);
			if (this.root == null) {
				this.root = new Node(data);
				this.root.x = 850;
				this.root.y = 20;
			} else {
				this.root.add(data)
			}
		}
	}
}