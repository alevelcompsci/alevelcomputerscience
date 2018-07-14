var table;
function setup()
{
	noCanvas();
	console.log(hash("egg"));
	console.log(hash("chicken"));
	table = new HashTable();
}

function draw()
{
	table.draw();
}

function HashTable()
{
	this.arr = new Array(40);

	this.draw = function()
	{
		for(let i =0; i < 40;i++)
		{
			rect(400,i * 10,50,50);
			rect(350,i * 10,10,10);
			text(i,350,i * 10);

		}
		for(let j = 0; i < this.arr.length;j++)
		{
			let n = this.arr[n];
			n.draw();
		}
	}
	this.add(data)
	{
		let n = new Node(data);
		this.arr[n.address] = n;
	}
	this.search(data)
	{
		var p = hash(data)
		this.arr[p].c = color(255,0,0);
	}
}

function Node(data)
{
	this.data = data;
	this.address = hash(this.data);
	this.x = 0;
	this.y = 0;
	this.c = 255;

	this.draw = function()
	{

	}
}

function hash(x)
{
	return x.hashCode() % 40;
}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		cha = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+cha;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
