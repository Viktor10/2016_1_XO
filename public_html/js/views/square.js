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
            switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#d1c4e9");
					 
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
					
					
                    break;
                //помечен тобой
                case 1:
                    rect.graphics.beginFill("#d1c4e9");
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
					rect.graphics.setStrokeStyle(5,"round").beginStroke("#04B486");
					rect.graphics.arc(this.model.get('posX'), this.model.get('posY'), this.model.get('size')/2.7, 0, Math.PI*2);
								
                    break;
                //помечен противником
                case -1:
                  					
					rect.graphics.beginFill("#d1c4e9");
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
			
					rect.graphics.setStrokeStyle(5,"round");
					rect.graphics.beginStroke("#FF45FF");
					rect.graphics.moveTo(
						this.model.get('posX') - this.model.get('size') / 3.2,
						this.model.get('posY') - this.model.get('size') / 3.2);
					rect.graphics.lineTo(
						this.model.get('posX') + this.model.get('size') / 3.2,
						this.model.get('posY') + this.model.get('size') / 3.2);
					rect.graphics.moveTo(
						this.model.get('posX') + this.model.get('size') / 3.2,
						this.model.get('posY') - this.model.get('size') / 3.2);
					rect.graphics.lineTo(
						this.model.get('posX') - this.model.get('size') / 3.2,
						this.model.get('posY') + this.model.get('size') / 3.2);
					rect.graphics.endStroke();
				
                    break;
            }
            //сама отрисовка
          

            this.stage.addChild(rect);
        }
    });

    return SquareView;
});