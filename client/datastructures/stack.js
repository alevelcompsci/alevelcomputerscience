var angle = 0;
var slider;
var stackpointer = -1;
var stack = [];
var items = [];
var input;
var button;
var removebutton;
function setup() {
  stroke(0);
  var canvas = createCanvas(800, 800);
 
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y + 50);
  textSize(20);
  textAlign(CENTER);
  
  input = createInput("");
  input.position(x + 280 , 750 + y);
  button = createButton('push');
  button.position(input.x + input.width, input.y);
  button.mousePressed(() => 
  {
	  if(!input.value() == "")
	  {
		  add(input.value());
	  }
	  
  })

  removebutton = createButton('pop');
  removebutton.position(input.x + 80, button.y + 30);
  removebutton.mousePressed(() =>
	{
		if(stackpointer > -1)
		{
			stackpointer--;
			stack.pop();	
			items.splice(-1,1);
		}	
	});
 
 add("a");
}

function draw() {

  background(255);
  rect(0,0,width - 10,height - 10);
  line(width - 600,0,width - 600,height - 100);
  line(width - 200,0,width - 200, height - 100);
  line(width - 600, height - 100, width - 200, height - 100);
  for(i =0;i < items.length; i++)
  {
	  items[i].display();
  }

}
function add(value)
{	
	if(stackpointer < 6)
	{
		pushToStack(value);
		console.log("Added to stack");
	}
}

function pushToStack(data)
{
	
 	stackpointer++;
 	stack.push(data);

 	var yprev = 700 - (stackpointer * 100);
 	var x1 = width - 600;
 	var y1 = 700 - ((stackpointer + 1) * 100);
 	var x2 = width - 200
 	var y2 = 700 - ((stackpointer +1) * 100)
 
	items.push(new StackElement(x1,y1,x2,y2,yprev,data));
	input.value('');
	
}


function StackElement(x1,y1,x2,y2,yprev,data)
{
	this.display = function()
	{
		line(x1, y1,x2,y2);
		text(data,400,(y1 + yprev) / 2);
	}
}


 
