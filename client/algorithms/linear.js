var unsortedArray;
var items = [];
var arrowx = 0;
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
	searchButton.mousePressed( () => unsortedArray.linearSearch(searchInput.value()));
	resetButton = createButton("reset");
	resetButton.position(searchButton.x,searchButton.y+searchButton.height);
	resetButton.mousePressed(() => 
	{
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
	line(arrowx + 50, 100, arrowx + 50, 150);
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

	this.linearSearch = async function(data)
	{
		for(var i = 0 ; i < this.data.length;i++)
		{
			await sleep(800);
			arrowx = this.data[i].x - 10;
			if(this.data[i].data == data)
			{
				console.log("found");
				this.data[i].c = color(255,0,0);
				return true;
			}
		}

	}

	
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