var registers = [];
var programCounter = 0;
var accumulator = "Accumulator";
var instructionRegister = " Instruction Register";
var addressRegister= "Address Register";

var input;
var output;

var instructions = [];
var instructionList = ["ADD", "SUB", "STA", "SKIP", "LDA", "BRA", "BRZ", "BRP"];


var instructionInput;
var runProgramButton;
function Register(x, y, index) {
	this.value = "000";
	this.x = x;
	this.y = y;
	this.index = index;

	this.draw = function () {

		rect(this.x, this.y, 50, 50);
		textSize(20);
		text(this.value, this.x + 25, this.y + 30);
		textSize(14);
		text(this.index, this.x + 25, this.y);
	}

}
function setup() {
	stroke(0);
	var canvas = createCanvas(1600, 800);
	
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y + 50);
	textAlign(CENTER);
	
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var r = new Register((i + 1) * 65, (j + 1) * 70, (j * 10) + i);

			registers.push(r);
		}
	}
	instructionInput = createInput("");
	instructionInput.position(900,150);
	instructionInput.size(600,100);
	runProgramButton = createButton("Run Program");
	runProgramButton.position(instructionInput.x + instructionInput.width,instructionInput.y);
	runProgramButton.size(100,100);
	runProgramButton.mousePressed(cycle);

}


function draw() {
	background(255);
	rect(0, 0, width - 10, height - 10);
	for (var i = 0; i < registers.length; i++) {
		registers[i].draw();
	}
	
	rect(730,200,150,80);
	rect(730,200,150,30);

	rect(730,300,150,80);
	rect(730,300,150,30);

	rect(730,400,150,80);
	rect(730,400,150,30);

	rect(730,500,150,80);
	rect(730,500,150,30);
	text("Program Counter",810,220);
	text("Accumulator", 810, 320);
	text("Instruction Register",810,420);
	text("Address Register",810,520);
}

function cycle(instructions) 
{
	console.log("running");
	fetch(instructions);
	while(true)
	{
		var instruction = registers[programCounter].value;
		programCounter++;	
		instructionRegister = Math.floor(instruction/100);
		addressRegister = instruction - (instructionRegister*100);
		if(instruction == 0)
		{
			break;
		}
		execute();

	}
}

function fetch(instructions) {

	for(let i = 0; i < instructions.length;i++)
	{
		registers[i].value = parse(instructions[i]);	
	}


}



function execute() {

	switch (instructionRegister) {
		 case 1:
            accumulator += registers[addressRegister].value;
            break;
        case 2:
             accumulator -= registers[addressRegister].value;
            break;
        case 3:
            registers[addressRegister].value = accumulator;
            break;
        case 4:
            console.log("Unknown command");
            break;
        case 5:
           accumulator = registers[addressRegister].data;
            break;
        case 6:
            programCounter = addressRegister;
            break;
        case 7:
            if(accumulator == 0)
			{
				programCounter = addressRegister;
			}
            break;
        case 8:
            if(accumulator >= 0)
			{
				programCounter = addressRegister;
			}
            break;
        case 9:
            if(addressRegister == 1)
            {
            	//create dialog box
            	break;
            }
            else if(addressRegister == 2)
            {
            	//output
            }            
		}
	}


function parse(str) {
	var instruct;
	if (str == "INP") {
		instruct = 901;
	} else if (str == "OUT") {
		instruct = 902;
	} else {
		for (var i = 0; i < instructionList.length; i++) {

			if (i == 3) {
				i++;
			}
			var reg = RegExp("(" + instructionList[i] + ")" + " (\\d\\d)", 'g');
			var m = reg.exec(str);
			var found = reg.test(str);
			console.log(m);

			if (m != null) {
				instruct = (i + 1).toString() + m[2];
				console.log(instruct);
			}

		}
	}

	return instruct;
}

