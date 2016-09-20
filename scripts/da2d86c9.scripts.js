"use strict";angular.module("sherNegarApp",["ngCookies","ngResource","ngSanitize","ngRoute","angularSpectrumColorpicker"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("sherNegarApp").controller("MainCtrl",["$scope",function(a){a.fonts=[{name:"Nazanin",font:"nazanin"},{name:"Nastaliq",font:"nastaliq"}],a.backgroundTypes=[{name:"Color",type:"color"},{name:"Gradient",type:"gradient"},{name:"Radial Gradient",type:"rgradient"}],a.form={},a.resetToDefault=function(){a.form={poem:"روشن از پرتو رويت نظري نيست که نيست\nمنت خاک درت بر بصري نيست که نيست\nناظر روي تو صاحب نظرانند آري\nسر گيسوي تو در هيچ سري نيست که نيست\nاشک غماز من ار سرخ برآمد چه عجب\nخجل از کرده خود پرده دري نيست که نيست\nتا به دامن ننشيند ز نسيمش گردي\nسيل خيز از نظرم رهگذري نيست که نيست\nتا دم از شام سر زلف تو هر جا نزنند\nبا صبا گفت و شنيدم سحري نيست که نيست\nمن از اين طالع شوريده برنجم ور ني\nبهره مند از سر کويت دگري نيست که نيست\nاز حياي لب شيرين تو اي چشمه نوش\nغرق آب و عرق اکنون شکري نيست که نيست\nمصلحت نيست که از پرده برون افتد راز\nور نه در مجلس رندان خبري نيست که نيست\nشير در باديه عشق تو روباه شود\nآه از اين راه که در وي خطري نيست که نيست\nآب چشمم که بر او منت خاک در توست\nزير صد منت او خاک دري نيست که نيست\nاز وجودم قدري نام و نشان هست که هست\nور نه از ضعف در آن جا اثري نيست که نيست\nغير از اين نکته که حافظ ز تو ناخشنود است\nدر سراپاي وجودت هنري نيست که نيست",width:851,height:425,textColor:"#ffffff",bgType:"color",bgColor:"#36393D",bgColor2:"#777777",font:"nastaliq",fontSize:20,verticalRadius:110,horizontalRadius:200,maxAngle:270,rotationAmount:0}},a.resetToDefault();var b=new Raphael("canvas",a.form.width,a.form.height),c=null,d=null,e=null,f=null,g=null,h=function(a){return a*(Math.PI/180)};a.processPoem=function(e){switch(e&&(b.clear(),c=b.rect(0,0,a.form.width,a.form.height),d=b.circle(a.form.width/2,a.form.height/2,Math.max(a.form.width/2,a.form.height/2)),g=b.freeTransform(d),g.hideHandles()),b.setSize(a.form.width,a.form.height),d.hide(),a.form.bgType){case"color":c.attr("fill",a.form.bgColor),c.attr("stroke",a.form.bgColor);break;case"gradient":c.attr("fill","190-"+a.form.bgColor+"-"+a.form.bgColor2),c.attr("stroke","#ffffff");break;case"rgradient":c.attr("fill",a.form.bgColor),c.attr("stroke",a.form.bgColor),d.show(),d.attr("fill","r"+a.form.bgColor2+"-"+a.form.bgColor),d.attr("stroke",a.form.bgColor),g.showHandles()}i(e)},a.saveImage=function(){f&&f.hideHandles(),g&&g.hideHandles();var c=b.text(a.form.width-100,10,"http://samanbarghi.com/sher-negar");c.attr({"font-size":9,fill:"#ffffff"});var d=b.toSVG();canvg(document.getElementById("finalCanvas"),d);var e=document.getElementById("finalCanvas").toDataURL("image/png");document.getElementById("myImg").src=e,f&&f.showHandles(),g&&g.showHandles(),c.remove()};var i=function(c){if(c){var d=a.form.poem.split("\n"),g=a.form.maxAngle/(d.length-1);e=b.set();for(var i=0;i<d.length;i++){var j=g*i,k=a.form.width/2+Math.cos(h(a.form.rotationAmount+g*i))*a.form.horizontalRadius,l=a.form.height/2-Math.sin(h(a.form.rotationAmount+g*i))*a.form.verticalRadius,m=b.text(k,l,d[i]);m.rotate(-1*j),e.push(m)}f=b.freeTransform(e)}e.attr({"font-size":a.form.fontSize,"font-family":a.form.font,fill:a.form.textColor})};a.processPoem(!0),$("#maxAngle").anglepicker({start:function(a,b){},change:function(a,b){$("#maxAngleInput").val(b.value),$("#maxAngleInput").change()},stop:function(a,b){},value:180}),$("#textRotation").anglepicker({start:function(a,b){},change:function(a,b){$("#textRotationInput").val(b.value),$("#textRotationInput").change()},stop:function(a,b){},value:0})}]);