angular.module('starter.controllers')
.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',
      //templateNamespace: 'svg',
    link : function(scope, elem, attrs) {
        
        console.log("detect-Gestures Id: " + attrs.id);
        console.log("mode: " + attrs.mode);
        console.log("image-id: " + attrs.imageid);
        console.log("set-size: " + attrs.setsize);
        console.log("tool: " + attrs.tool); // pencil (default), circle.
     
    //set SVG control to image-id position and dimensions, otherwise set fullscreen
    image = svg = document.getElementById(attrs.imageid); //Get svg element
    var strokeWidth = 2;
    var color = 'red';

         //Listen event changeTool
          scope.$on('changeTool', function(e, arg){
            color = arg.color;
            attrs.tool = arg.tool;
            tool = arg.tool;
          });
        

        
    if(image != null) //get viewport info from topo
        {
            var witdh;
            var hight;

            width = scope.topo.svgViewPortWidth;
            height = scope.topo.svgViewPortHeight;
            
                
            elem[0].setAttribute("viewBox", "0 0 " + width + " " + height);
            console.log("SVG set to width:" + image.offsetWidth + " height:" + image.offsetHeight);
       
            console.log ("detect-Gestures Id: " + attrs.id + " Imagefound");
            //elem[0].setAttribute("width",image.offsetWidth);
            //elem[0].setAttribute("height",image.offsetHeight);
            //viewBox="0 0 320 568" 
            //var width = image.offsetWidth;
            //var height = Math.round( width*(scope.topo.pictureNaturalWidth/scope.topo.pictureNaturalHeight));
             }
        else //new: set viewport info
            {
                            if(attrs.setsize == "true")
                {
                    var width = 320; //image.offsetWidth;
             var height = Math.round( width*(4032/3024));
                     elem[0].setAttribute("viewBox", "0 0 " + width + " " + height);       
            //var height = Math.round( width*(scope.pictureNaturalHeight/scope.pictureNaturalWidth));
                     elem[0].setAttribute("viewBox", "0 0 " + width + " " + height);
            console.log("SVG set to width:" + width + " height:" + height);
       
                }
                
//                elem[0].setAttribute("viewPortWidth",window.innerWidth);
//                elem[0].setAttribute("viewPortHeight",window.innerHeight); 
//                elem[0].setAttribute("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight);
            }
    var tool = attrs.tool;        
    var initpointX;
    var initpointY;
    newPath = null;
    scope.elementId = 0; // when dealing with lines, circles(elements)
        //if there are older elements in DB, could cause issue. replace by unique id...
        
    //svg = document.getElementById('svgOne'); //Get svg element
    console.log("window inner width:" + window.innerWidth + " height:" + window.innerHeight);       
    var svgBounds = elem[0].getBoundingClientRect(); //currently used to calculate touch coordenates
    console.log("svgBounds at directive loading:");
    console.log(svgBounds);
    
        
        //Init SVG with saved data in topo object
        angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null 
};
        if(!angular.isUndefinedOrNull(scope.topo)){
           if(!angular.isUndefinedOrNull(scope.topo.svgData)){
        var SVGitem= elem[0]; //modal.$el.find('modalTopoSvg'); //document.getElementById('modalTopoSvg');
        var SVGdata = scope.topo.svgData;  // A string
        SVGitem.innerHTML = SVGdata;
        console.log(SVGitem);
        }
    }
        
        
        
    Xpos = function(event){return (event.gesture.touches[0].pageX - svgBounds.left)};
    
    Ypos = function(event){return (event.gesture.touches[0].pageY - svgBounds.top)};  
    
    scope.touchStart = function(event){
        
    //update SWounds. its not ready when the directive starts
        svgBounds = elem[0].getBoundingClientRect(); //currently used to calculate touch coordenates
        console.log("svgBounds at event touchstart :");
    console.log(svgBounds);
        console.log("touchstart function called elementId: " + scope.elementId);
        //var svgns = "http://www.w3.org/2000/svg";
        // var line = document.createElementNS(svgns, 'line');
        newPath = null;
        
       if(event != null)//typeof event.touches === 'undefined' || event.touches === null)
        {
        //svg = document.getElementById('svgOne'); //Get svg element
//        initpointX = event.touches[0].pageX;
//        initpointY = event.touches[0].pageY;
        //initpointX = event.gesture.touches[0].pageX;
        //initpointY = event.gesture.touches[0].pageY;    
            
        newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        newPath.setAttribute("id",scope.elementId);
        newPath.setAttribute("d","M " + Xpos(event) + " " + Ypos(event) + " ");
        newPath.style.stroke = "red"; //Set stroke colour
        newPath.style.strokeWidth = "4"; //Set stroke width
        newPath.style.fill = "none";
        
        elem[0].appendChild(newPath);
            //console.log("child appended");
        }
    };
    
    scope.touchMove = function(event){
        console.log("touchmove function called");
        //svg = document.getElementById('svgOne'); //Get svg element
        newPath = null;
        newPath = document.getElementById(scope.elementId);
        //console.log(newPath)
        if(newPath != null)
            {
                //newPath.setAttribute("d",newPath.getAttribute("d") + "L " + lastMove.touches[0].pageX + " " + lastMove.touches[0].pageY + " "); //Set path's data
                newPath.setAttribute("d",newPath.getAttribute("d") + " L " + Xpos(event) + " " + Ypos(event) + " "); //Set path's data
                elem[0].appendChild(newPath);
                //lastMove = event;  
            }
    };
    
    scope.touchEnd = function(event){
        //console.log("touchend function called");
        scope.elementId = scope.elementId +1;
        console.log(elem[0]);
    };
     scope.circleTouchStart = function(event){
        
    //update SWounds. its not ready when the directive starts
        svgBounds = elem[0].getBoundingClientRect(); //currently used to calculate touch coordenates
        console.log("svgBounds at event touchstart :");
    console.log(svgBounds);
        console.log("circleTouchstart function called elementId: " + scope.elementId);
        //var svgns = "http://www.w3.org/2000/svg";
        // var line = document.createElementNS(svgns, 'line');
        newPath = null;
        newPathArray = [];
        
       if(event != null)//typeof event.touches === 'undefined' || event.touches === null)
        { 
            //<circle cx="100" cy="100" r="68" stroke="red" stroke-width="1" fill="transparent" />
        if(tool=='circle')
        {
        newPath = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
        newPath.setAttribute("id",scope.elementId);           
        newPath.setAttribute("cx",Xpos(event));
        newPath.setAttribute("cy",Ypos(event));
        newPath.setAttribute("r",10);
            
        newPath.style.stroke = color; //Set stroke colour
        newPath.style.strokeWidth = strokeWidth; //Set stroke width
        newPath.style.fill = "transparent";
        
        newPathArray.push(newPath);
        }
        if(tool == 'doubleCircle')
        {
        newPath = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
        newPath.setAttribute("id",scope.elementId);           
        newPath.setAttribute("cx",Xpos(event));
        newPath.setAttribute("cy",Ypos(event));
        newPath.setAttribute("r",10);
            
        newPath.style.stroke = color; //Set stroke colour
        newPath.style.strokeWidth = strokeWidth; //Set stroke width
        newPath.style.fill = "transparent";
        
        newPathArray.push(newPath);
        
        newPath = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
        newPath.setAttribute("id",scope.elementId + "-A");  // -A, -B, -C notation          
        newPath.setAttribute("cx",Xpos(event));
        newPath.setAttribute("cy",Ypos(event));
        newPath.setAttribute("r",10 - 4);
            
        newPath.style.stroke = color; //Set stroke colour
        newPath.style.strokeWidth = strokeWidth; //Set stroke width
        newPath.style.fill = "transparent";
        
        newPathArray.push(newPath);
        }
        
        for(i=0;i< newPathArray.length; i++)
        {   
        elem[0].appendChild(newPathArray[i]);
            //console.log("child appended");
        }
        }
    };
    
    scope.circleTouchMove = function(event){
        console.log("touchmove function called");
        //svg = document.getElementById('svgOne'); //Get svg element
        newPath = null;
        newPathArray = [];
        if(tool == 'circle')
            {
        newPath = document.getElementById(scope.elementId);
                newPathArray.push(newPath);
            }
        if(tool == 'doubleCircle')
            {
                newPath = document.getElementById(scope.elementId);
                newPathArray.push(newPath);
                newPath = document.getElementById(scope.elementId + "-A");
                newPathArray.push(newPath);            
            }
        //console.log(newPath)
        if(newPathArray.length > 0)
            {
                if(tool == 'circle')
                    {
                        currentCX = newPathArray[0].getAttribute("cx");
                        currentCY = newPathArray[0].getAttribute("cy");
                        currentR =  newPathArray[0].getAttribute("r");
                        newR = 10 + Math.abs(parseInt(currentCX,10) - parseInt(Xpos(event),10));
                        newPathArray[0].setAttribute("r",newR); //Set path's data
                        
                    }
                if(tool == 'doubleCircle')
                    {
                        currentCX = newPathArray[0].getAttribute("cx");
                        currentCY = newPathArray[0].getAttribute("cy");
                        currentR =  newPathArray[0].getAttribute("r");
                        newR = 10 + Math.abs(parseInt(currentCX,10) - parseInt(Xpos(event),10));
                        newPathArray[0].setAttribute("r",newR); //Set path's data
                        
                        currentCX = newPathArray[1].getAttribute("cx");
                        currentCY = newPathArray[1].getAttribute("cy");
                        currentR =  newPathArray[1].getAttribute("r");
                        newR = 10 + Math.abs(parseInt(currentCX,10) - parseInt(Xpos(event),10)) -4;
                        newPathArray[1].setAttribute("r",newR); //Set path's data
                        
                    }
               
                for(i=0;i< newPathArray.lenght;i++)
                    {
                elem[0].appendChild(newPathArray[i]);
                    }
                //lastMove = event;  
            }
    };
    
    scope.circleTouchEnd = function(event){
        //console.log("touchend function called");
        scope.elementId = scope.elementId +1;
        console.log(elem[0]);
    };
    //svg.addEventListener('touchstart',$scope.touchStart,false);
//    svg.addEventListener('touchmove', $scope.touchMove,false);
//    svg.addEventListener('touchend',$scope.touchEnd ,false);
    
//    ionic.onGesture('dragstart', $scope.touchStart, svg,'' );
//    ionic.onGesture('drag', $scope.touchMove, svg,'' );
//    ionic.onGesture('dragend', $scope.touchEnd, svg,'' );
        
//        scope.changeStrokeWidth = function(event)
//        {
//            if (strokeWidth == 2) { strokeWidth = 4;} else { strokeWidth = 2;}
//        };
//        scope.changeColor = function(event)
//        {
//            if (color == 'red') { color = 'green';} else { color = 'red';}
//        };
        
        
        
        if(attrs.mode == "edit") //resgister events if not read-only 
            {
                switch(tool) {
                    case 'circle':
                    case 'doubleCircle':
                        $ionicGesture.on('dragstart',scope.circleTouchStart,elem);
                        $ionicGesture.on('drag', scope.circleTouchMove,elem);
                        $ionicGesture.on('dragend',scope.circleTouchEnd,elem);
        
        break;
    case 'pencil': //default
    default:
                        $ionicGesture.on('dragstart',scope.touchStart,elem);
                        $ionicGesture.on('drag', scope.touchMove,elem);
                        $ionicGesture.on('dragend',scope.touchEnd,elem);
                }
               
//                $ionicGesture.on('swiperight',scope.changeStrokeWidth,elem); // strokeWidth
//                $ionicGesture.on('swipeleft',scope.changeColor,elem);  // color
            }
        else
            {
                console.log("detect-Gestures Id: " + attrs.id + " READ-ONLY setup");
            }
    

    }
  }
})

;

