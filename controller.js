$(document).ready(function () {
							
					 
	var gamePosition=1;
	var questionNumber=0;
	var myloader='activity.json';
	var clock=0;
	var dotLength=0;
	var clockVar;
	var correct=0;
	var wrong=0;
	qbank=new Array();
	typeArray=new Array();
 		
 		$.getJSON(myloader, function(data) { 
		qbank=[];
		
		for(i=0;i<data.questionlist.length;i++){ 
			typeArray=[];
			typeArray[0]=data.questionlist[i].passage;
			typeArray[1]=data.questionlist[i].question;
			typeArray[2]=data.questionlist[i].option1;
			typeArray[3]=data.questionlist[i].option2;
			typeArray[4]=data.questionlist[i].option3;
			qbank[i]=typeArray;
		}
		  
		
		 introPage();
		 
		})//gtjson
	
	
	
	function introPage(){
		 
		var loads="assets.html #intro";
	$("#inner").empty();$('#inner').load(loads);
		$('#mainStage').append('<div id="nextButton">NEXT</div>');
		
	
							
							
							
	$('#nextButton').click(function(){
	 $("#nextButton").empty();						
	$("#nextButton").append('SKIP');						
	$('#nextButton').off("click");
 changeQuestion();	
									
	})//button						
							
	 function changeQuestion(){gamePosition=1;
		 $("#inner").empty();$("#inner2").empty();
		 $("#inner").css("right","0px");
		 $("#inner2").css("right","-800px");
		 clock=6;var q1;var q2;var q3; var questionLock=false;
		 var rnd=Math.ceil(Math.random()*3);
		 if(rnd==1){q1=qbank[questionNumber][2];q2=qbank[questionNumber][3];q3=qbank[questionNumber][4];}
		 if(rnd==2){q2=qbank[questionNumber][2];q3=qbank[questionNumber][3];q1=qbank[questionNumber][4];}
		 if(rnd==3){q3=qbank[questionNumber][2];q1=qbank[questionNumber][3];q2=qbank[questionNumber][4];}
		 
		 
		 
		 $('#inner').append('<div class="dots" id="dot1">&nbsp;</div>');
		 $('#inner').append('<div class="text1">'+qbank[questionNumber][0]+'</div>');
		 
		 $('#inner2').append('<div class="text1"><br><br>'+qbank[questionNumber][1]+'<br><br></div>');
		 $('#inner2').append('<div id="1" class="option">'+q1+'</div>');
		 $('#inner2').append('<div id="2" class="option">'+q2+'</div>');
		 $('#inner2').append('<div id="3" class="option">'+q3+'</div>');
		 
		clockVar= setInterval(function(){timeControl();},1000);
		 
		 
		 function timeControl(){ 
			 clock--;
			 dotLength=clock*14;
			 $('.dots').css("width",dotLength+"px");
			 if(clock==0){clearInterval(clockVar);
			 	 $('#inner').animate({"right": "+=800px"},"slow", function() {$('#inner').empty();gamePosition=2;});
				 $('#inner2').animate({"right": "+=820px"},"slow", function() {});
			 }
		 }//timecntrol
		 
		 $('.option').click(function(){
			if(!questionLock){questionLock=true;
			if(this.id==rnd){correct++;
				$('#inner2').append('<div class="feedback1">CORRECT</div>');
				}//corect						
				
				else{wrong++;
					$('#inner2').append('<div class="feedback2">WRONG</div>');
				}//wrong
				questionNumber++;
				
				clockVar= setTimeout(function(){if(questionNumber==qbank.length){finalSlide();}else{changeQuestion();}},3000);
				gamePosition=3;
			}//questionlock
		})//click option
		 
		 function finalSlide(){
			 $("#inner").empty();$("#inner2").empty();
			 $("#nextButton").css("display","none");
			 $('#inner2').append('<br><br><div class="text1">You have finished the activity.</div>');
			 $('#inner2').append('<br><div class="feedback1b">Correct answers: '+correct+'</div>');
			 $('#inner2').append('<br><div class="feedback2b">Wrong answers: '+wrong+'</div>');
			 }
			 
			 
			 $('#nextButton').off("click");
			 $('#nextButton').click(function(){
				if(!questionLock && clock>0){clock=1;timeControl();}
				if(gamePosition==3){clearTimeout(clockVar);if(questionNumber==qbank.length){finalSlide();}else{changeQuestion();}}
				if(gamePosition==2){questionNumber++;if(questionNumber==qbank.length){finalSlide();}else{changeQuestion();}}
				
				})
		 
	 }//change question
							
							
							
	}//intro page						
	});//doc ready