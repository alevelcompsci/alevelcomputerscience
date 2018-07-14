var queue = [];
var items = [];
var front = 0;
var end = 0;
var enqueueButton;
var dequeueButton;
var enqueueInput;
function setup() {
  stroke(0);
  var canvas = createCanvas(800, 600);
  
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x  , y);
  textSize(25);
  textAlign(CENTER); 

  enqueueInput = createInput("");
  enqueueInput.position(x + 270,y + 500);
  enqueueButton = createButton('enqueue');
  enqueueButton.position(enqueueInput.x +  enqueueInput.width, enqueueInput.y);
  enqueueButton.mousePressed(() => 
    {
      if(!enqueueInput.value() == "")
       {
         enqueue(enqueueInput.value());
       }
    })
  dequeueButton = createButton("Dequeue");
  dequeueButton.position(enqueueButton.x, enqueueButton.y+ 30);
  dequeueButton.mousePressed(dequeue);
  enqueue("a");
}
function draw() {
  background(255);
  rect(0,0,width - 10,height- 10);
  var x1 = 100;
  rect(x1,x1,600,300);
  for(i =0; i < items.length;i++)
  {
    items[i].display();
  }

}

function enqueue(data)
{
  if(front < 6)
  {
    var x =  (front +2)* 100;
    
    var xprev = (front + 1) * 100;
    
    var y1 = 100;
    var y2 = 400;
    items.push(new QueueElement(x,y1,y2,xprev,data));
    front++;
    enqueueInput.value('');
    console.log("added");
  
  }
  
}
function dequeue()
{
   if(front >= 1)
   {
      for(i=items.length - 1;i>0;i--)
      {
        var x2 = items[i-1].x; 
        var xprev2= items[i-1].xprev;
        items[i].x = x2;
        items[i].xprev = xprev2;
      }
      items.shift();
      front--;
      console.log("remove");
   }
}
function QueueElement(x1,y1,y2,xprev,data)
{
  this.x = x1;
  this.y1 = y1;
  this.y2 = y2;
  this.data = data;
  this.xprev = xprev;
  
  
  this.display= function()
  {
   
    line(this.x,this.y1,this.x,this.y2);
    
    text(this.data,(this.x+this.xprev)/2 ,260);
  }
  
}




 
