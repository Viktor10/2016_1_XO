define(function (require) {
    var Backbone = require('backbone'),
        createjs = require('easel'),
        _ = require('underscore'),
        SquareView = require('views/square');

    var BlockView = Backbone.View.extend({

        initialize: function (model, stage) {
            this.model = model;
            this.stage = stage;
        },

        render: function (player) {
            var rect = new createjs.Shape();
            switch (this.model.get('value')) {
                //не помеченный квадрат
                case 0:
                    rect.graphics.beginFill("#f3e5f5");
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
                    break;
                //помечен тобой
                case 1:
                    rect.graphics.beginFill("#f3e5f5");
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
					rect.graphics.setStrokeStyle(16,"round").beginStroke("#04B486");
					rect.graphics.arc(this.model.get('posX'), this.model.get('posY'), this.model.get('size')/2.7, 0, Math.PI*2,5);
					//04B486
					
					
                    break;
                //помечен противником
                case -1:
                    rect.graphics.beginFill("#f3e5f5");
					rect.graphics.drawRect(
						this.model.get('posX') - this.model.get('size') / 2,
						this.model.get('posY') - this.model.get('size') / 2,
						this.model.get('size'),
						this.model.get('size')
					);
					
					rect.graphics.setStrokeStyle(16,"round");
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
           
            this.stage.addChild(rect);

            var border = new createjs.Shape();
            if (this.model.get('isClickable')) {
                var color = '';
                if (player.get('id') === 1) {
                    color = '#04B486';    
                } else {
                    color = '#FF45FF';
                }
                border.graphics.beginStroke(color);
                border.graphics.setStrokeStyle(4);
            } else {
                border.graphics.beginStroke("#ffffff");
                border.graphics.setStrokeStyle(4);
            }

            border.graphics.drawRect(
                this.model.get('posX') - this.model.get('size') / 2,
                this.model.get('posY') - this.model.get('size') / 2,
                this.model.get('size'),
                this.model.get('size')
            );
            this.stage.addChild(border);

            if (!this.model.get('isFinished')) {
                _.each(this.model.get('squareModels'), function (model) {
                    var squareView = new SquareView(model, this.stage);
                    squareView.render();
                }.bind(this));
            }
        }
    });

    return BlockView;
});