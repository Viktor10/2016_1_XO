define(function(require) {
    var Backbone = require('backbone'),
        createjs = require('easel');

    var SquareView = Backbone.View.extend({

        initialize: function(model, stage) {
            this.stage = stage;
            this.model = model;
        },

        render: function() {



            var rect = new createjs.Shape();
            //определение каким цветом рисовать
            
            rect.graphics.beginFill("#d1c4e9");
                
            //сама отрисовка
            rect.graphics.drawRect(
                this.model.get('posX') - this.model.get('size') / 2,
                this.model.get('posY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );

            this.stage.addChild(rect);

			
		switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#d1c4e9");
                    break;
                //помечен тобой
                case 1:
                    //rect.graphics.beginFill("#ffff00");
					drawCircle((this.model.get('posX') - this.model.get('size') / 2),  (this.model.get('posY') - this.model.get('size') / 2), this.model.get('size'));
                    break;
                //помечен противником
                case -1:
                    //rect.graphics.beginFill("#d50000");
					drawX((this.model.get('posX') - this.model.get('size') / 2),  (this.model.get('posY') - this.model.get('size') / 2), this.model.get('size'));
                    break;
            }	
	function drawCircle(xc, yc, size) {  
	
		var canvas=document.getElementById("gameCanvas")
		var x=canvas.getContext("2d");
		
		x.beginPath()
		x.lineWidth=5;
		x.strokeStyle="#04B486"
		x.arc(xc, yc ,(size/2.5),0, Math.PI*2,false);
		x.stroke();
        }
		function drawX(xc, yc, size) {  
		
		var canvas=document.getElementById("gameCanvas")
		var x=canvas.getContext("2d");
		
		x.lineWidth=5;
		x.strokeStyle="#FF45FF"
		x.lineCap='round';
		x.beginPath()
		x.moveTo(xc - size/2.5, yc - size/2.5);
		x.lineTo(xc + size/2.5, yc + size/2.5);
		x.stroke();
		x.beginPath()
		x.moveTo(xc + size/2.5,yc - size/2.5);
		x.lineTo(xc - size/2.5,yc + size/2.5);
		x.stroke();
        }	
		
   
   
   
    });

    return SquareView;
});
