var unsortedArray;
var sorted = true;
var arrowx = 0;
var arrowx2 = 0;
var sortButton;
var items = [];
var toBeSorted = true;

function setup() {
	var canvas = createCanvas(800, 400);
	
	textSize(40);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y - 100);
	unsortedArray = new ArrayData();
	sortButton = createButton("Sort");
	sortButton.position(930, 450);
	sortButton.mousePressed(() => sorted = false);

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


	if (!sorted && toBeSorted == true) {
		unsortedArray.sort();
		sorted = true;
		toBeSorted = false;
	}
	unsortedArray.display();

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
		for (let j = 0; j < this.data.length; j++) {
			this.data[j].display();
		}
	}

	this.sort = function ()
	{

	}

	this.mergeSort = function()
	{
		
	}

	this.slice = function(a,b)
	{
		var arr = new ArrayData();
		arr.data = this.data.splice(a,b);
		return arr;
	}
	this.concat = function(newArr)
	{
		for(let i = 0; i < this.newArr.length;i++)
		{
			this.data.push(newArr[i]);
		}
	}
}


function Block(data, position) {
	this.data = data;
	this.position = position;
	this.x = (this.position * 100) + 10;
	this.y = 100;
	this.c = 255;

	this.display = function () {

		fill(this.c);
		rect(this.x, this.y, 75, 75);
		fill(0);
		text(this.data, this.x + 17, this.y + 50);
	}
}