var unsortedArray;
var sorted = true;
var arrowx = 0;
var arrowx2 = 0;
var sortButton;

var resetButton;

function setup() {
	
	var canvas = createCanvas(800, 400);
	
	textSize(40);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y - 30);
	unsortedArray = new ArrayData();

	sortButton = createButton("Sort");
	sortButton.position(width/2 - 20 , height/2 + 20);
	sortButton.mousePressed(() => sorted = false);
	resetButton = createButton("reset");
	resetButton.position(sortButton.x,sortButton.y+sortButton.height);
	resetButton.mousePressed(() => 
	{
		sorted = true;
		unsortedArray = new ArrayData();
	});

}

function draw() {
	background(255);
	stroke(0);
	fill(255);
	strokeWeight(1);
	rect(0, 0, width - 10, height - 10);
	strokeWeight(10);
	line(arrowx + 50, 0, arrowx + 50, 110);
	line(arrowx2 + 50, 0, arrowx2 + 50, 110);
	strokeWeight(2);
	unsortedArray.display();
	if (!sorted ) {
		unsortedArray.sort();
		sorted = true;
		
	}

}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function ArrayData() {
	this.data = new Array(8);
	var randomArray = new Array(8);
	randomArray = randomArray.fill(0).map(() => Math.floor((Math.random() * 100)));


	for (var i = 0; i < this.data.length; i++) {
		this.data[i] = new Block(randomArray[i], i);
	}


	this.display = function () {
		for (let i = 0; i < this.data.length; i++) {
			this.data[i].display();
		}
	}

	this.sort = async function () {
		for (var i = 0; i < this.data.length; i++) {
			let value = this.data[i].data;
			this.data[i].c = 100;
			if (i > 0) {
				await sleep(1000);
				this.data[i].boxPosition = this.data[i - 1].boxPosition + 75;
			}
			for (var j = i - 1; j > -1 && this.data[j].data > value; j--) {

				arrowx = this.data[j + 1].boxPosition - 10;
				arrowx2 = this.data[j].boxPosition - 10;
				this.data[j].c = color(255, 0, 0);
				this.data[j + 1].c = color(255, 0, 0);
				await sleep(1000);
				this.data[j + 1].data = this.data[j].data;
				this.data[j].c = 100
				this.data[j + 1].c = 100
			}

			this.data[j + 1].data = value;
			await sleep(1000);
		}
		arrowx = 1000;
		arrowx2 = 1000;
	}


}

async function swapBlock(arr, i, j) {
	arr[j].c = 100;
	arr[i].c = 100;
	var tempA = arr[i].data;
	arr[i].data = arr[j].data;
	arr[j].data = tempA;
	arrowx = arr[j].position * 100 + 20;
	await sleep(1000);

	arr[i].c = 255;
	arr[j].c = 255;
}



function Block(data, position) {
	this.data = data;
	this.position = position;
	this.boxPosition = (this.position * 100) + 10;
	this.c = 255;

	this.display = function () {

		fill(this.c);
		rect(this.boxPosition, 100, 75, 75);
		fill(0);
		text(this.data, this.boxPosition + 17, 150);
	}
}