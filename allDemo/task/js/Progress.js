var Progress = function() { 
			var progress = { 
				textheight: null, 
				//提供一个方法（id，画布高度，外围的尺寸，过度的长度）
				renderOne: function(id, length, r, percent) { 
					//获取到canvas
					var canvas = document.getElementById(id); 
					var context = canvas.getContext("2d");
					canvas.width = length;
					canvas.height = length; 
					var i = 0; 
					var interval = setInterval(function() { 
						i++;
						progress.render(context, length, r, i, percent); 
						if(i >= percent) { clearInterval(interval) } }, 10) }, 
						render: function(context, length, r, i, percent) { context.clearRect(0, 0, length, length);
						//起始一条路径
						context.beginPath(); 
						//创建线性渐变（用在画布内容上）
						var gradient = context.createLinearGradient(length, 0, 0, 0);
						gradient.addColorStop("0", "#ff9900");
						gradient.addColorStop("1.0", "#ff9900");
						//设置或返回用于笔触的颜色、渐变或模式
						context.strokeStyle = gradient;
						//当前线的宽度
						context.lineWidth = r;
						//创建弧/曲线（X,Y,Z,开始的角度，结束的角度，顺时针旋转）
						context.arc(length / 2, length / 2, length / 2 - r, -0.5 * Math.PI, -0.5 * Math.PI + i * 0.02 * Math.PI, false);
						//绘制已定义的路径
						context.stroke();
						//创建从当前点回到起始点的路径
						context.closePath();
						context.beginPath();
						context.strokeStyle = "#8d8d8d";
				context.lineWidth = 2;
				context.fillStyle = "#ffffff";
				//外围上面白色的小圆
				context.arc(length / 2, r, 0.6 * r, 0, 2 * Math.PI, false);	
				context.stroke();
				context.fill();
				context.closePath();
				context.beginPath(); 
				var radian = percent / 100 * 2 * Math.PI - 0.5 * Math.PI; 
				var x = Math.cos(radian) * (length / 2 - r) + length / 2; var y = Math.sin(radian) * (length / 2 - r) + length / 2;
				//外围下面的小圆
				context.arc(x, y, 0.8 * r, 0, 2 * Math.PI, false);
				//绘制已定义的路径
				context.stroke();
				//填充当前绘图（路径）
				context.fill();
				//创建从当前点回到起始点的路径
				context.closePath();
				context.beginPath();
				context.lineWidth = 1;
				context.fillStyle = "#f2f2f2";
				context.arc(length / 2, length / 2, 0.8 * r, 0, 2 * Math.PI);
				context.strokeStyle = "#333";
				context.fill();
				context.closePath();
				context.beginPath();
				context.font = "bold " + (length / 2 - 2.5 * r) / 2 + "px 微软雅黑";
				context.fillStyle = "#ff9900"; 
				var text = percent + "分";
				textwidth = context.measureText(text).width; 
				if(this.textheight == null) { var div = document.createElement("div");
					document.body.appendChild(div);
					div.innerHTML = text;
					div.style.fontSize = ((length / 2 - 2.5 * r) / 2) + "px";
					this.textheight = div.offsetHeight;
					div.parentNode.removeChild(div) } textheight = this.textheight;
					context.fillText(text, (length - textwidth) / 2, length / 2 + textheight / 4);
					context.fill();
					context.closePath() 
				} 
			}; 
		return progress
};
