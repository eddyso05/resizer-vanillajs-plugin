/**
 * Resize 0.1.0
 *It is a scaling resizer without responsive much
 * 
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 */

(function($) {
    'use strict';

   var defineResizer = function Resizer(){
       var Resizer = function Resizer(el,options) {
           this.el             = window;
           this.options        = Object.assign({}, this.defaults, options);
           this.bindEvents();
       }

       Resizer.prototype = {
           defaults: {
            oriWidth      : 1920,
            oriHeight     : 1080,
            scaleX        : window.innerWidth/1920,
            scaleY        : window.innerHeight/1080,
            scale2        : self.scaleX/2,
            uniScale      : null,
            uniScale0     : null,
            screenWidth   : window.innerWidth,
            screenHeight  : window.innerHeight,
            uni1          : new Object(),

            // default css value
            transformOrigin : '0 0 0',
            speedTransition : "1",

           },

           bindEvents: function bindEvents(){
             var self = this;
             self.scale();
             self.resize();
           },

           scale: function scale(){
            var self = this;
            
            var options = self.options;

            options.scaleX=window.innerWidth/options.oriWidth;
            options.scaleY=window.innerHeight/options.oriHeight;
            options.scale2=window.innerWidth/2;

            if(window.innerHeight > window.innerWidth*options.oriHeight/options.oriWidth) {
                options.uniScale  = options.scaleX;
                options.uniScale0 = window.innerHeight/options.oriHeight;
        
            } else {
                options.uniScale  = options.scaleY;
                options.uniScale0 = window.innerWidth/options.oriWidth;
            }

            options.uni1.uniScale1=window.innerWidth/options.oriWidth;
        
            options.uni1.x=window.innerWidth/2-options.uni1.uniScale1*options.oriWidth/2;
            options.uni1.y=window.innerWidth/2-options.uni1.uniScale1*options.oriHeight/2;
        
            options.uni1.height=options.oriHeight*options.uni1.uniScale1;
            options.uni1.width=options.oriWidth*options.uni1.uniScale1;

            self.transform();
           },

           defaultCss : function defaultCss(){

            var className = document.querySelector(".resizer");
            var self = this;
            var options = self.options;

            // left top center
            className.style.left  = (window.innerWidth-1920*options.uniScale)/2 + 'px';
            className.style.top   = (window.innerHeight-1080*options.uniScale)/2 + 'px';

            //default value
            className.style.setProperty(" -webkit-transform-origin", options.transformOrigin);
            className.style.setProperty("transform-origin", options.transformOrigin);
            className.style.setProperty("width",  options.oriWidth + "px");
            className.style.setProperty("height",  options.oriHeight + "px");

            className.style.webkitTransition =  options.speedTransition +"s all ease";
            className.style.transition =  options.speedTransition +"s all ease";
            className.style.position = "absolute";
           },

           transform: function transform(){
            var self = this;
            var options = self.options;

            var className = document.querySelector(".resizer");

            className.style.transform        = "scale("+options.uniScale+","+options.uniScale+")"; 
            className.style.msTransform      = "scale("+options.uniScale+","+options.uniScale+")";
            className.style.webkitTransform  = "scale("+options.uniScale+","+options.uniScale+")";
            className.style.MozTransform     = "scale("+options.uniScale+","+options.uniScale+")";

            self.defaultCss();
        },

        resize:function resize(){
            var self = this;
            window.onresize = function(event) {
                self.scale();
            };
        },
       }
       return Resizer;
   };

   var Resizer = defineResizer();
   new Resizer(document.querySelector('resizer'));
 })();