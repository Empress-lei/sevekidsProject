function myLoad(){
	if(0==$("#loading").size()){
		var loadingstr = '<div id="loading" class="loading" style="display: none;">';
		loadingstr += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAD1klEQVR4nO2czXGzQAyGfUkdubsLF+Ei0o1PuacEl4CrcA2+5uKfYd7vgMUn5F0Dy8JKRM8MEwbzY17Eu5LA2Wwcx3Ecx3Ecx3Ecx3Ecx3Ecx3EcZzUA+ATwDaBaePoqfe7FeIpeoRzfpTUoAppIL82utA6LAxe+DChpNfX1F3/VajabouL/TdEB7EDZTBN9y9IcswLwBeCztB6z0wpeQuwYzXdZ5wUA5euaBH9lXfk9migvma+P5RvWox/Al/Ioj1HBaqoJHXl6Ok3A2BIf1kUnLImPJkOwwRAbtCA+gJ05Tx/2favS2kZB+W7jeEh0+TeMzmoXliyGM0x0nZaD0g0vPqXuQ+4vjK6ox9LeXl9/H+cD7tUe92qP23GL23GLe7XH43xI3mfnb5gKmoorLJg+Ps4H3I5bXH8+gtPtuB06YL4iIz+MHrvBQjbzOB/eCn6v9qgvp7SdDx9o9fRzkFn4+nLC43xobIMJISOdrOX685Eu+MvBe4XX4/NZ/V0IzD2b+zl9Vl9OnYtAU9KFGGY16xSehOx4thCHi93n96MvQH/E6ymmckf8vdoHI75dRVwcugj15dROfB+jxO+P+nVGPJ2wtAs+z0V9l8nQeqMyHVMen2lwpVTxXu07J15fTu1yeTe064c0ZHdGUtSrj/gMwge9/Xnioc/GCj+4sDKWTk4uoEI5OkUp/4ynkCR8bBBNEh7osyVVwk9ukMmo5nbDhad0kea5j8sCim+XnN28LlNVue6miN6e1zMb6RRO+C8gRTZZjcxepMD8ogwW/p3VNMtU9Wo+58hsaJYLz+eB/3cKfdZuzu6g2Bgw5NgCPTn8ZpO/LUyFEQkpLSOUasqI7qsF3mIhlSSQq0MpWgYk9Es1+qxgpS0BeFk/492oZ2AlkOsJVED4UKXKJ2kxfPvRNvP8DpFlevydQC6fjwgf68nwgVOul9SriaPL3znI4POxLIUv7zxtYkWWvDjJT6PC6LMZAhPt5l0RJdNIuV2oV5/N27XaDIEpdhN50NFZhbIXNrDKO2QGiwE02wyB1OwmIHxIPN4miA22mUUHNNsMgQlVLFWi794WCEX4jJGu32Y4mPHhdyzDmUX0Bn1FUwzM/FYZ3Rmh7CbvgZQ1xfrAHL2bmDDzHkf/oCrBOt6R1z+oSgCDr2x3sRftBGxHvb1oJ5DpAUkB7EY7AZtRbzfaCdjzel2vYk8BtqLefrQTWCqvn459b5fARtTbqVKHAv1Rb6cnMxZo/WWgpQ5kKtD5W9j1DKgxwP93jYbpL4juOI7jOI7jOI7jOI7jOI7jOI7jOM5c/ANKwdjH+c45CQAAAABJRU5ErkJggg==">';
		loadingstr += '<img class="loading-box" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAEbklEQVR4nO2dLbKsMBCFWRP1toJ5hhVgUPixOBR7wCFgCVdPwSAQWDBgnr9PUcUknR8gISH0VxV3bxVzujlpAkl7nqUMVRGOaZJPr+g9x8Eyx8Hy7++fX3LMcbB8Pp+f7ejaJhuqIuzr0jf9O6xnKzIkMG9Mr+jddd0va2yDYfp3WsGYJvkRocnBE50ViMcFYaiKcHpF7z3CrlYzx8EyvaL3doxpkndtk31ZzZ5AtE3mtCUNVRHKZPcq7pgm+Zms7OvSH6oiXIMicxc4FQAZwec4WMY0yXX/8KEqQlEQbh+Avi59nuBXic1CFIRbBoDn4XMcLDZNbH1d+ty7oG0y09cohJfltglOwguA1dk/pkl+R8FJeAGw7newrGVMk9z0tR1lqIrQauuBrGWOg8XaW3MHrOz/fD4/Ri8KEn16RW9jF6WJrm0yK8RniX5naxEBWc+lky5LdOsmHg1A1nNZ5kOiu+DnshgR/+mir1wqPlQyPlH0FbDiUV1qQg9HT/B0EX1d+toesvq69J9UvewFqnaUOAHp6y7W6Wch6/zTfk/6+hwHi6JrdQ5lfg9ZzJMnUxGQ3x/Si7QY9HUxpN/vtpyhKkK0mGOQlrMr68lsx9JRHtJypLMes/08ZJUjlfVktuOEup/dWY/Zro5dXk/W7ejtx6HKS15dj9muFjLrwT8iF8Kwbj8PWdeDDkJOqgau00mEkyzajB64doM2ow+u3ZDVDNbuamFWN1t/R5tRz9ZuvnweX3TohVxC8DyPflpFf1cP6fN9XfrUxIpPq+ohn2KHqgipidX0RboKNcGi8NdATbBY0VwDCm8ISngsJa9hW1Ki8BdC1fIo/DV0bZN96bytaqzZWOUgVPVo5Y42B6GE/1ovRuG1wRXe6DZCx6HKdhT+GijhqfoS0QL1ahVcK0aUQ5Xt4FoxohTwnQe4VowohfnOA2t5vTCX3rGy0QtzBRgnWH2Qe8m+1sOkvvFDDiH8WMzIiRQPQPhNqtQnxcguSJsB3/Ch3ahH+ptUtBu1SH/6fmi3GgJCPq1y3+7t2reDcNm9V/jUzmTE8zzJSRX6J8z6cxzeGY9Zf5xTe4UP78dHzp8DQWY91vViyLr90CeRyg6+eQhKD1ZSftaWwyg/u0372YoOoOXsNq1nKzoAdCanMkvWdrbizSFLRy2b9yC/f7L40GSq7Wtr6CDjJ4oPia59N83TxTci+spTxYc8/dJ+KKymJS5XO1D1YqwJDdgvycE6Hzo733jnH1a7Hhesh9UPxZptqVC7nrtbD6uTm3Ub9Fidwu6W/bw2qNaebMLtFGl5p2Ce4Mb9XBaW9dh4B4ga/VpnLSJEfVJNNywXNWq/TZazkG3XrDsIfV36IrFXwe9cFFDIBGANQtc22VAV4ZmMG6oiHNMkn17RW7ZJu7WTpwr6uvR5cwArGOvo2iZbBd2OOQ4WGYEhD3cqw2WQvQvIsVfcx2X3HoaqCLu2yUSB4DVi5wk9vaI3ii1BX5f+Nhjbwau3tyLbbCH/AaDS4lvMBTvBAAAAAElFTkSuQmCC">';
		loadingstr += '<p>努力加载中...</p>';
		loadingstr += '</div>';
		loadingstr += '<div id="loadingMask" class="loading-mask" style="display: none;"></div>';
		$("body").append(loadingstr);
	}
	loading();
}

function myLoadClose(){
	unLoading();
}
