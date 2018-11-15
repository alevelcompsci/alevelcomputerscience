console.log("starting");
var unsortedArray;
var sorted = true;
var arrowx;
var sortButton;
var toBeSorted = true;
var resetButton;
console.log("starting");

function setup() {
	
	var canvas = createCanvas(windowWidth, 400);
	textSize(40);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y - 30);
	unsortedArray = new ArrayData();
	sortButton = createButton("Sort");

	sortButton.position(width/2 - 20 , height/2 + 20);
	resetButton = createButton("reset");
	resetButton.position(sortButton.x,sortButton.y+sortButton.height);
	resetButton.mousePressed(() => 
	{
		sorted = true;
		unsortedArray = new ArrayData();
	});
	sortButton.mousePressed(() => sorted = false);
	

}

function draw() {
	background(255);
	stroke(0);
	fill(255);
	strokeWeight(1);
	
	strokeWeight(10);
	line(arrowx + 27, 0, arrowx + 27, 110);
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
			for (var j = 0; j < (this.data.length - i - 1); j++) {

				if (this.data[j].data > this.data[j + 1].data) {

					swapBlock(this.data, j, j + 1);
					await sleep(1000);
					console.log(this.data);
				}
			}
		}
		arrowx = 1000;
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
	this.c = 255;

	this.display = function () {

		fill(this.c);
		rect(this.position * 100 + 10, 100, 75, 75);
		fill(0);
		text(this.data, (this.position * 100) + 27, 150);
	}
}