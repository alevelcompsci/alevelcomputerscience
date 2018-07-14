var unsortedArray;
var items = [];
var leftPointer = 0;
var leftText;
var rightPointer = 700;
var rightText;
var midPointer = 300;
var midText;
var searchInput;
var searchButton;
var resetButton;
function setup() {
	var canvas = createCanvas(800, 400);
	
	textSize(40);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y - 100);
	unsortedArray = new ArrayData();
	searchInput = createInput();
	searchInput.position(width/2 - 80 , height/2 + 20);
	searchButton = createButton("Search");
	searchButton.position(searchInput.x + searchInput.width, searchInput.y);
	searchButton.mousePressed( () => unsortedArray.binarySearch(searchInput.value()));
	resetButton = createButton("reset");
	resetButton.position(searchButton.x,searchButton.y+searchButton.height);
	resetButton.mousePressed(() => 
	{
		unsortedArray = new ArrayData();
		unsortedArray.sort();
		leftPointer = 0;
		rightPointer = 700;
		midPointer = 300;

	});
	unsortedArray.sort();




}

function draw() {
	background(255);
	stroke(0);
	fill(255);
	strokeWeight(1);
	rect(0, 0, width - 10, height - 10);
	strokeWeight(10);
	line(leftPointer + 50, 100, leftPointer + 50, 150);
	line(rightPointer + 50, 100, rightPointer + 50, 150);
	line(midPointer + 50, 100, midPointer + 50, 150);
	strokeWeight(3);
	text("L",leftPointer + 37,80);
	text("R",rightPointer + 34,80);
	text("M",midPointer + 30,80);
	strokeWeight(2);
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

	this.sort = function () {

		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < (this.data.length - i - 1); j++) {

				if (this.data[j].data > this.data[j + 1].data) {

					swapBlock(this.data, j, j + 1);
					
				}
			}
		}
		
	}
	this.binarySearch =  async function(data)
	{

		var middle = Math.floor(this.data.length - 1/2);
		var left = 0;
		var right = this.data.length - 1;
		var notFound = true;
		while(left != right && notFound)
		{
			console.log("middle: " + middle);
			console.log("right: " + right);
			console.log("left: " + left);
			if(this.data[right].data == data)
			{
				console.log("poop");
				middlePointer= this.data[right].x - 10;
				this.data[middle].c =  color(255,0,0);
				notFound = false;
				return;
			}
			if(this.data[middle].data == data)
			{
				console.log("poop2");
				middlePointer= this.data[middle].x - 10;
				this.data[middle].c =  color(255,0,0);
				notFound = false;
				return;
				
			}
			
			if(this.data[middle].data > data)
			{
						
				right = middle;
				middle = Math.floor((right + left)/2)
				await sleep(1500);
				midPointer = this.data[middle].x - 10;
				await sleep (500);
				rightPointer = this.data[right].x - 10;
			}

			if(this.data[middle].data < data)
			{
				
				left = middle;
				middle = Math.floor((right + left)/2);
				await sleep(1000);
				midPointer = this.data[middle].x - 10;
				await sleep(1000);
				leftPointer = this.data[left].x;
			}
		}

	}
	
}
 function swapBlock(arr, i, j) {
	arr[j].c = 100;
	arr[i].c = 100;
	var tempA = arr[i].data;
	arr[i].data = arr[j].data;
	arr[j].data = tempA;
	arr[i].c = 255;
	arr[j].c = 255;
}


function Block(data, position) {
	this.data = data;
	this.position = position;
	this.x = (this.position * 100) + 10;
	this.y = 150;
	this.c = 255;

	this.display = function () {

		fill(this.c);
		rect(this.x, this.y, 75, 75);
		fill(0);
		text(this.data, this.x + 17, this.y + 50);
	}
}