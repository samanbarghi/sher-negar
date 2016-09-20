'use strict';

angular.module('sherNegarApp')
  .controller('MainCtrl', function ($scope) {
  	//constants
  	$scope.fonts = [
		{name:'Nazanin', font:'nazanin'},
		{name:'Nastaliq', font: 'nastaliq'}
	];
	$scope.backgroundTypes = [
		{name: 'Color', type: 'color'},
		{name: 'Gradient', type: 'gradient'},
		{name: 'Radial Gradient', type: 'rgradient'},
		// {name: 'Image', type: 'image'}
	];
   /*jshint multistr: true */

	$scope.form = {};

	$scope.resetToDefault = function(){
	   //form default values
		$scope.form = {
			poem: 'روشن از پرتو رويت نظري نيست که نيست\n\
منت خاک درت بر بصري نيست که نيست\n\
ناظر روي تو صاحب نظرانند آري\n\
سر گيسوي تو در هيچ سري نيست که نيست\n\
اشک غماز من ار سرخ برآمد چه عجب\n\
خجل از کرده خود پرده دري نيست که نيست\n\
تا به دامن ننشيند ز نسيمش گردي\n\
سيل خيز از نظرم رهگذري نيست که نيست\n\
تا دم از شام سر زلف تو هر جا نزنند\n\
با صبا گفت و شنيدم سحري نيست که نيست\n\
من از اين طالع شوريده برنجم ور ني\n\
بهره مند از سر کويت دگري نيست که نيست\n\
از حياي لب شيرين تو اي چشمه نوش\n\
غرق آب و عرق اکنون شکري نيست که نيست\n\
مصلحت نيست که از پرده برون افتد راز\n\
ور نه در مجلس رندان خبري نيست که نيست\n\
شير در باديه عشق تو روباه شود\n\
آه از اين راه که در وي خطري نيست که نيست\n\
آب چشمم که بر او منت خاک در توست\n\
زير صد منت او خاک دري نيست که نيست\n\
از وجودم قدري نام و نشان هست که هست\n\
ور نه از ضعف در آن جا اثري نيست که نيست\n\
غير از اين نکته که حافظ ز تو ناخشنود است\n\
در سراپاي وجودت هنري نيست که نيست',
	    width: 851,
	    height: 425,
	    textColor: '#ffffff',
	    bgType: 'color',
	    bgColor: '#36393D',
	    bgColor2: '#777777',
	    font: 'nastaliq',
	    fontSize: 20,
	    verticalRadius: 110,
	    horizontalRadius: 200,
	    maxAngle: 270,
	    rotationAmount: 0

		};

	}
	//set everything to default
	$scope.resetToDefault();


	//bootstrap the canvas
	var paper = new Raphael('canvas', $scope.form.width, $scope.form.height);
	var bgRect = null;
	var radialCircle = null;
	var textGroup = null;
	//FreeTransform object
	var ft = null;
	var circleFt = null;

	var deg2rad = function(degrees){
		return  degrees * (Math.PI/180);
	};

	//if reset is true, reset the canvas
	$scope.processPoem = function(reset){
		if(reset){
			paper.clear();

			bgRect = paper.rect(0, 0, $scope.form.width, $scope.form.height);
			radialCircle = paper.circle($scope.form.width/2,$scope.form.height/2, Math.max($scope.form.width/2, $scope.form.height/2) );
			circleFt = paper.freeTransform(radialCircle);
			circleFt.hideHandles();
		}
		paper.setSize($scope.form.width, $scope.form.height);
		radialCircle.hide();


		//Set the background
		switch($scope.form.bgType){
			case 'color':
				bgRect.attr("fill", $scope.form.bgColor);
				bgRect.attr("stroke", $scope.form.bgColor);
				break;
			case 'gradient':
				bgRect.attr("fill", '190-'+$scope.form.bgColor + '-'+$scope.form.bgColor2);
				bgRect.attr("stroke", '#ffffff');
				break;
			case 'rgradient':
				bgRect.attr("fill", $scope.form.bgColor);
				bgRect.attr("stroke", $scope.form.bgColor);
				radialCircle.show();
				radialCircle.attr('fill', 'r'+$scope.form.bgColor2 + '-'+$scope.form.bgColor);
				radialCircle.attr("stroke", $scope.form.bgColor);
				circleFt.showHandles();

				break;
			default:
				break;
		}

		sun(reset);
	};

	$scope.saveImage = function() {
		//hid free transfer handles
		if(ft)
	    	ft.hideHandles();
	    if(circleFt)
	    	circleFt.hideHandles();
	   //add water mark
	   var verse = paper.text($scope.form.width-100, 10, "http://samanbarghi.com/sher-negar");
	   verse.attr({'font-size':9, 'fill': '#ffffff'});
	   //Use raphael.export to fetch the SVG from the paper
       var svg = paper.toSVG();

       //Use canvg to draw the SVG onto the empty canvas
       canvg(document.getElementById('finalCanvas'), svg);
       var dataURL = document.getElementById('finalCanvas').toDataURL("image/png");
       document.getElementById('myImg').src = dataURL;

       //hid free transfer handles
		if(ft)
	    	ft.showHandles();
	    if(circleFt)
	    	circleFt.showHandles();

	    verse.remove();
	}


	var sun = function(reset){
		if(reset){
			//width, height, verticalRadius, hrRadius, textSize
		    var lines = $scope.form.poem.split('\n');
		    var fullAngle = $scope.form.maxAngle /  (lines.length - 1);

			textGroup = paper.set();
		    for (var index = 0 ; index < lines.length ; index++){

				var angle =  fullAngle * index;
				var AX = $scope.form.width/2 + Math.cos(deg2rad($scope.form.rotationAmount + fullAngle * index)) * $scope.form.horizontalRadius;//$options[hr];
				var AY = $scope.form.height/2 - Math.sin(deg2rad($scope.form.rotationAmount + fullAngle * index )) * $scope.form.verticalRadius;// $options[vr] ;

			    var verse = paper.text(AX, AY, lines[index]);
			    verse.rotate(angle*-1);
			    textGroup.push(verse);
		    }
			ft = paper.freeTransform(textGroup);
		}
		textGroup.attr({ 'font-size': $scope.form.fontSize, 'font-family': $scope.form.font, 'fill':$scope.form.textColor });


	};


	//Process the poem for the first time
	$scope.processPoem(true);

	//set anglePicker
	$("#maxAngle").anglepicker({
    start: function(e, ui) {

    },
    change: function(e, ui) {
        $("#maxAngleInput").val(ui.value);
        $("#maxAngleInput").change();
    },
    stop: function(e, ui) {

    },
    value: 180
	});

	//set anglePicker
	$("#textRotation").anglepicker({
    start: function(e, ui) {

    },
    change: function(e, ui) {
        $("#textRotationInput").val(ui.value);
        $("#textRotationInput").change();
    },
    stop: function(e, ui) {

    },
    value: 0
	});

});
