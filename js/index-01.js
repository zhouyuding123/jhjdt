var cityname = '';
//  2020 1.4 修改
var areaname = '';
var streetname = '';


function oPopup() {
	
	let popup = document.getElementById('detail')
	let headMove = document.getElementById('headMove')
	// //点击某物体时，用popup对象即可，move和up是全局区域，
			// 也就是整个文档通用，应该使用document对象而不是popup对象(否则，采用popup对象时物体只能往右方或下方移动)  
		headMove.onmousedown = function(event){
			var event = event || window.event;  //兼容IE浏览器
			//    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
			var diffX = event.clientX - popup.offsetLeft;
			var diffY = event.clientY - popup.offsetTop;
			if(typeof popup.setCapture !== 'undefined'){
					popup.setCapture(); 
			}
			document.onmousemove = function(event){
				var event = event || window.event;
				var moveX = event.clientX - diffX;
				var moveY = event.clientY - diffY;
				if(moveX < 0){
					moveX = 0
				}else if(moveX > window.innerWidth - popup.offsetWidth){
					moveX = window.innerWidth - popup.offsetWidth
				}
				if(moveY < 0){
					moveY = 0
				}else if(moveY > window.innerHeight - popup.offsetHeight){
					moveY =  window.innerHeight - popup.offsetHeight
				}
				popup.style.left = moveX + 'px';
				popup.style.top = moveY + 'px'
			}
			document.onmouseup = function(event){
				this.onmousemove = null;
				this.onmouseup = null;
				//修复低版本ie bug  
				if(typeof popup.releaseCapture!='undefined'){  
				popup.releaseCapture();  
				}  
			}
		}
}
oPopup()



var pw = document.body.clientWidth;
console.log(pw);
window.onresize = function() {
	// 0401
	// myChart01.resize();
	// myChart011.resize();
	myChart02.resize();
};

// layui.config({base:'layui/lay/mymod/'});
layui.use(['form', 'layedit', 'laydate', 'laypage'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate,
		laypage = layui.laypage;


	// 城市列表

	// 0306
	var ids = [];

	// 0203修改
	var datas = [{
		name1: "宁波市",
		id: 23,
		child1: [{
				name1: "鄞州区",
				id: 24,
				child1: [{
						name1: "姜山镇",
						id: 27
					},
					{
						name1: "下应街道",
						id: 28
					}
				]
			},
			{
				name1: "海曙区",
				id: 25,
				child1: [

				]
			},
			{
				name1: "江北区",
				id: 26,
				child1: [

				]
			},
			{
				name1: "象山县",
				id: 27,
				child1: [

				]
			}
		]
	}];


	var datas = [];
	var josnzz = {
		city: getCookie("City"),
		area: getCookie("Area"),
		street: getCookie("Street")
	}
	$.ajax({
		url: callurl + "GetAllofAreaInfo",
		data: josnzz,
		type: "post",
		dataType: "JSON",
		async: false,
		success: function(res) {
			console.log(res);
			// 0205修改
			datas = res;
			var list01 = res;

			if (getCookie("City") == "" && getCookie("Area") == "" && getCookie("Street") == "") {


				// 0306
				ids = ['23'];

			} else {
				// 0306

				cityname = getCookie("City");
				areaname = getCookie("Area");
				streetname = getCookie("Street");

				var city01 = getCookie("City");
				var areaname01 = getCookie("Area");
				var streename01 = getCookie("Street");

				for (var i = 0; i < list01.length; i++) {
					if (list01[i].name1 == cityname) {
						city01 = list01[i].id;
						var list02 = list01[i].child;

						if (areaname01 !== "") {
							for (var j = 0; j < list02.length; j++) {
								if (list02[j].name1 == areaname) {
									areaname01 = list02[j].id;
									var list03 = list02[j].child;
									if (streename01 !== "") {
										for (var k = 0; k < list03.length; k++) {
											if (list03[k].name1 == streetname) {
												streename01 = list03[k].id;
											}
										}
									}
								}
							}
						}
					}
				}
				if (areaname01 == "") {
					ids = [city01];
				} else if (streename01 == "") {
					ids = [city01, areaname01];
				} else {
					ids = [city01, areaname01, streename01];
				}

				// 0306

			}


		},
		error: function(xml) {
			console.log(xml);
		}
	});

	console.log(datas);
	// 0205修改

	$('#mulselectbox1').FMulSelect({


		// width: 500,  // 宽度，默认自动
		height: 32, // 高度，默认30px
		levels: 3, // 联动级别数量，默认 3级 ,可配置范围 1-n，理论上没有上限
		data: datas, // 数据源，json格式
		levelNames: ['市', '区', '街道'], //每个级别的名称，如省市区
		dataKeyNames: { //配置数据源的key值 默认为 id  name  child
			"id": "id",
			"name": "name1",
			"childs": "child"
		}
	});

	// 设置值
	console.log(ids);
	$('#mulselectbox1').FMulSelectSetVal(ids);
	var url = window.location.href;
	console.log(decodeURI(url));
	var theRequest = url.split('?City=');
	console.log(theRequest);
	if (theRequest.length > 1) {
		GetRequest();
	}
	cityname = $("#mulselectbox1").find("span[data-level='1']").html();
	if ($("#mulselectbox1").find("span[data-level='2']").html() == "请选择") {} else {
		areaname = $("#mulselectbox1").find("span[data-level='2']").html();
	}
	if ($("#mulselectbox1").find("span[data-level='3']").html() == "请选择") {} else {
		streetname = $("#mulselectbox1").find("span[data-level='3']").html();
	}


	//
	dw(cityname, areaname, streetname);
	char(cityname, areaname, streetname);
	// console.log($("#mulselectbox1").find("span[data-level='1']").html());


	$(document).on("click", ".FMulSelectUI-dropdown-levelItem", function() {


		setTimeout(function() {

			cityname = $("#mulselectbox1").find("span[data-level='1']").html();
			if ($("#mulselectbox1").find("span[data-level='2']").html() == "请选择") {
				areaname = '';
			} else {
				areaname = $("#mulselectbox1").find("span[data-level='2']").html();
			}
			if ($("#mulselectbox1").find("span[data-level='3']").html() == "请选择") {
				streetname = '';
			} else {
				streetname = $("#mulselectbox1").find("span[data-level='3']").html();
			}



			dw(cityname, areaname, streetname);
			char(cityname, areaname, streetname);
		}, 1000)


	});

	// 下拉联动 0115
	function areaxqLd(type, id, cs03) {
		var json = {
			Id: id
		};
		if (cs03 == 0) {
			areaname = '';
			streetname = '';
			dw(cityname, areaname, streetname);
			char(cityname, areaname, streetname);

		} else {
			$.ajax({
				url: callurl + "GetAreaById",
				data: json,
				type: "post",
				dataType: "JSON",
				success: function(res) {
					console.log(res);
					var list = res;
					if (type == 2) {
						$('#area02').html("");
						$('#area02').append(new Option('全部', ''));
						$.each(list, function(index, item) {
							$('#area02').append(new Option(item.Name, item.Id));
						});


						if (id == "") {
							areaname = '';
						} else {
							areaname = list[0].Name;
						}
						// dw(cityname,areaname,streetname);
						// char(cityname,areaname,streetname);
						areaxqLd(3, list[0].Id);
					} else {
						$('#area03').html("");
						$('#area03').append(new Option('全部', ''));
						$.each(list, function(index, item) {
							$('#area03').append(new Option(item.Name, item.Id));
						});
						// $('#area03').append(new Option('全部', id));

						console.log(list[0].Name);

						if (id == "") {
							streetname = '';
						} else {
							streetname = list[0].Name;
						}
						// 初始事件
						// char(cityname,areaname,streetname)

						// 0117
						dw(cityname, areaname, streetname);
						char(cityname, areaname, streetname);

					}

					form.render('select');



				},
				error: function(xml) {
					console.log(xml);
				}
			});
		}


	}


	// 下拉选择监听01
	form.on('select(area)', function(data) {
		var textname = data.elem[data.elem.selectedIndex].text;
		console.log(textname);

		cityname = textname;
		
		var areavalue = data.value;
		// areaxqLd(2,areavalue);


	});

	// 下拉二级
	form.on('select(area02)', function(data) {
		var textname = data.elem[data.elem.selectedIndex].text;
		console.log(textname);

		areaname = textname;
		
		var areavalue = data.value;

	});
	// 下拉三级

	form.on('select(area03)', function(data) {
		var textname = data.elem[data.elem.selectedIndex].text;
		streetname = textname;


	});



	//  2020 1.4 添加点击事件
	myChart02.on('click', function(prame) {
		console.log(prame);
		// opentc(prame.seriesName, prame.name);
	})
	

	// 0228
	// 点击事件
	$(document).on("click", ".mode01-table-01-c", function() {
		var text = $(this).find(".mode01-table-02").children().html();
		opentc02(text);
	});

	$(document).on("click", ".mode04-fl01", function() {
		opentc03("企业总量", 1);
	});
	/**
	 * @Description: 修改
	 * @author zky
	 * @date 2020/3/10
	 * 超期未改企业数
	 */
	$(document).on("click", ".mode04-fl02", function() {
		opentc("超期未改企业数", '未整改');
	});
	$(document).on("click", ".navc", function() {
		$(this).addClass("navc-a").siblings().removeClass("navc-a");
		var index = $(this).index();
		console.log(index);
		if (index == 0) {
			// opentc("超期未改企业数",'未整改');
			$(".qi-tcc-title").html('超期未改企业数');
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', '', '', '未整改');
		} else {
			$(".qi-tcc-title").html('企业数');
			tcopenList03(1, 100000, cityname, areaname, streetname, '1');
		}
	})

	$(document).on("click", ".mode04-fl03", function() {
		opentc03("总体排查次数", 1);
	});

	// 关闭列表详情弹窗
	$(document).on("click", ".close033", function() {
		layer.closeAll();
	})

	function opentc(name, nametype) {
		/**
		 * @Description: 修改
		 * @author zky
		 * @date 2020/3/10
		 */
		var areah = ['1250px', '700px'];
		if(pw < 1400){
			areah = ['1250px', '550px'];
		}
		var html01 = '<div class="qi-tcc">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'</div>'
		var html02 = '<div class="qi-tcc" style="    margin-top: 17px;">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'    <div class="nav-c clearfix" style="top:0;width: 50%;">\n' +
			'            <!-- 2020 1.4 修改 -->\n' +
			'        </div>'
		'</div>'
		if (name == "超期未改企业数") {
			html = html02;
			if(pw < 1400){
				areah = ['1250px', '550px'];
			}else {
				areah = ['1270px', '750px'];
			}
		} else {
			html = html01;

			if(pw < 1400){
				areah = ['1250px', '550px'];
			}else {
				areah = ['1250px', '700px'];
			}
		}
		if (nametype == "已环评" || nametype == "有" || nametype == "是" || nametype == "已整改" || nametype == "已验收") {
			cstype = "1";
			imgarray = 'img/new0115/icon-y.png';

		} else if (nametype == "未环评" || nametype == "无" || nametype == "否" || nametype == "未整改" || nametype == "未验收") {
			cstype = "0";
			imgarray = 'img/new0115/icon-w.png';
		} else {
			cstype = nametype;
		}

		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			area: areah,
			skin: 'yourClass',
			content: html
		});
		if (name == "企业环评分析") {
			tcopenList(1, 100000, cityname, areaname, streetname, cstype);

		} else if (name == "排污许可证情况") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', cstype);

		} else if (name == "危废仓库建设") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', cstype);

		} else if (name == "危废处置协议") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', cstype);

		} else if (name == "三废治理设施") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', cstype);

		} else if (name == "应急预案编制率") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', '', cstype);

		} else if (name == "自行监测完成率" || name == "超期未改企业数" || name == "企业数") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', '', '', cstype);

		} else if (name == "环保验收情况") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', '', '', '', cstype);

		} else if (name == "企业环保风险分析") {
			tcopenList(1, 100000, cityname, areaname, streetname, '', '', '', '', '', '', '', '', cstype);
		}
	}
	function tcopenList(pageIndex, pageSize, city, area, street, Ishpsx, Ispwxkz, Wfckjs, Wfczxy, Isdb, Isyjya, Iszg,
		Isys, Qyhbfx) {
		var json = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			city: city,
			area: area,
			street: street,
			Ishpsx: Ishpsx,
			Ispwxkz: Ispwxkz,
			Wfckjs: Wfckjs,
			Wfczxy: Wfczxy,
			Isdb: Isdb,
			Isyjya: Isyjya,
			Iszg: Iszg,
			Isys: Isys,
			Qyhbfx: Qyhbfx,
		};
		$.ajax({
			url: callurl + "CompanyHbInfo",
			data: json,
			type: "post",
			dataType: "JSON",
			success: function(res) {
				// 弹窗分页
				var dataList = res.data;
				var imgarray = 'img/new0115/icon-y.png';
				var imgarray02 = '';

				laypage.render({
					elem: 'qylist',
					count: res.count,
					limit: 8,
					prev: '《',
					next: '》',
					jump: function(obj) {
						//模拟渲染
						document.getElementById('biuuu_city_list').innerHTML = function() {
							console.log(thisData);
							var arr = [],

								thisData = dataList.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
							layui.each(thisData, function(index, item) {
								if (item.Ishpsx == '有' || item.Ispwxkz == '有' || item.Wfckjs == '有' || item.Wfczxy == '有' || item.Isdb ==
									'是' || item.Isyjya == '有' || item.Iszg == '已整改' || item.Isys == '有') {
									imgarray = 'img/new0115/icon-y.png';
									imgarray02 = '';
								} else if (item.Qyhbfx == "低" || item.Qyhbfx == "中" || item.Qyhbfx == "高") {
									if (item.Qyhbfx == "低") {
										imgarray = 'img/new0115/低.png';
										imgarray02 = '';
									}
									if (item.Qyhbfx == "中") {
										imgarray = 'img/new0115/中.png';
										imgarray02 = '';
									}
									if (item.Qyhbfx == "高") {
										imgarray = 'img/new0115/高.png';
										imgarray02 = '';
									}

								} else {
									imgarray = 'img/new0115/icon-w.png';
									imgarray02 = '';
								}
								arr.push(' <li class="qi-tcc-list-li" onclick="toMapid(' + item.Id + ')">\n' +
									'                   <div class="qi-tcc-list-item clearfix">\n' +
									'                       <div class="qi-tcc-list-item-01 fl">' + imgarray02 +
									'<img class="qi-tcc-list-item-01-img" src="' + imgarray + '" alt="" /></div>\n' +
									'                       <div class="qi-tcc-list-item-02 fl">' + item.Name + '</div>\n' +
									'                       <div class="qi-tcc-list-item-03 fr">' + item.Date + '</div>\n' +
									'                   </div>\n' +
									'               </li>');
							});
							return arr.join('');
						}();
					}
				});


			},
			error: function(xml) {
				console.log(xml);
			}
		});
	}
	
	function opentcOne(name, nametype) {
		var areah = ['1250px', '700px'];
		if(pw < 1400){
			areah = ['1250px', '550px'];
		}
		var html01 = '<div class="qi-tcc">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + nametype + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'</div>'
		var html02 = '<div class="qi-tcc" style="    margin-top: 17px;">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'    <div class="nav-c clearfix" style="top:0;width: 50%;">\n' +
			'            <!-- 2020 1.4 修改 -->\n' +
			'        </div>'
		'</div>'
		if (name == "超期未改企业数") {
			html = html02;
			if(pw < 1400){
				areah = ['1250px', '550px'];
			}else {
				areah = ['1270px', '750px'];
			}
		} else {
			html = html01;
	
			if(pw < 1400){
				areah = ['1250px', '550px'];
			}else {
				areah = ['1250px', '700px'];
			}
		}
	
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			area: areah,
			skin: 'yourClass',
			content: html
		})
		// let Ywzxlyclss = name.substring(0, 1)
		let level = nametype
			
		tcopenListOne(1, 100000, cityname, areaname, streetname, level);
		
	}
	function tcopenListOne(pageIndex, pageSize, city, area, street, level) {
		var json = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			city: city,
			area: area,
			street: street,
			// Ywzxlyclss: Ywzxlyclss,
			level: level
		};
		$.ajax({
			url: callurl + "CompanyJcbInfo",
			data: json,
			type: "post",
			dataType: "JSON",
			success: function(res) {
				// 弹窗分页
				console.log(res)
				var dataList = res.data;
				var imgarray02 = '';
	
				laypage.render({
					elem: 'qylist',
					count: res.count,
					limit: 8,
					prev: '《',
					next: '》',
					jump: function(obj) {
						//模拟渲染
						document.getElementById('biuuu_city_list').innerHTML = function() {
							console.log(thisData);
							var arr = [],
	
								thisData = dataList.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
							layui.each(thisData, function(index, item) {
								arr.push(' <li class="qi-tcc-list-li" onclick="toMapid(' + item.Id + ')">\n' +
									'                   <div class="qi-tcc-list-item clearfix">\n' +
									'                       <div class="qi-tcc-list-item-02 fl">' + item.Name + '</div>\n' +
									'                       <div class="qi-tcc-list-item-03 fr qi-tcc-padd">' + item.Ywzxlyclss + '</div>\n' +
									// '                       <div class="qi-tcc-list-item-03 fr">' + item.addtime + '</div>\n' +
									'                   </div>\n' +
									'               </li>');
							});
							return arr.join('');
						}();
					}
				});
	
	
			},
			error: function(xml) {
				console.log(xml);
			}
		});
	}
	
	function opentc02(name) {
		var html = '<div class="qi-tcc">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'</div>'
		/**
		 * @Description: 修改
		 * @author zky
		 * @date 2020/3/30
		 */
		var areah = ['1250px', '700px'];
		if(pw < 1400){
			areah = ['1250px', '550px'];
		}
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			area: areah,
			skin: 'yourClass',
			content: html
		});
		tcopenList02(1, 100000, cityname, areaname, streetname, name);
	}

	function tcopenList02(pageIndex, pageSize, city, area, street, Hylx) {
		var json = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			city: city,
			area: area,
			street: street,
			Hylx: Hylx,
		};

		console.log(json);
		$.ajax({
			url: callurl + "CompanyHbInfo",
			data: json,
			type: "post",
			dataType: "JSON",
			success: function(res) {
				// 弹窗分页
				var dataList = res.data;
				var imgarray = 'img/new0115/icon-y.png';
				laypage.render({
					elem: 'qylist',
					count: res.count,
					limit: 8,
					prev: '《',
					next: '》',
					jump: function(obj) {
						//模拟渲染
						document.getElementById('biuuu_city_list').innerHTML = function() {
							var arr = [],
								thisData = dataList.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
							layui.each(thisData, function(index, item) {
								// if(item.Ishpsx =='有'){
								//     imgarray = 'img/new0115/icon-y.png';
								// }else {
								//     imgarray = 'img/new0115/icon-w.png';
								// }
								arr.push(' <li class="qi-tcc-list-li" onclick="toMapid(' + item.Id + ')">\n' +
									'                   <div class="qi-tcc-list-item clearfix">\n' +
									'                       <div class="qi-tcc-list-item-01 fl"><img class="qi-tcc-list-item-01-img" src="' +
									imgarray + '" alt="" /></div>\n' +
									'                       <div class="qi-tcc-list-item-02 fl">' + item.Name + '</div>\n' +
									'                       <div class="qi-tcc-list-item-03 fr">' + item.Date + '</div>\n' +
									'                   </div>\n' +
									'               </li>');
							});
							return arr.join('');
						}();
					}
				});


			},
			error: function(xml) {
				console.log(xml);
			}
		});

	}


	function opentc03(name, type) {
		var html = '<div class="qi-tcc">\n' +
			'<div class="close033">&#xe70e;</div>\n' +
			'   <div class="qi-tcc-contnet">\n' +
			'       <div class="qi-tcc-contnet01">\n' +
			'           <div class="qi-tcc-title">' + name + '</div>\n' +
			'\n' +
			'\n' +
			'           <div class="qi-tcc-page" id="biuuu_city_list">\n' +
			'\n' +
			'           </div>\n' +
			'\n' +
			'           <div class="qi-tcc-list">\n' +
			'               <ul id="qylist"></ul>\n' +
			'           </div>\n' +
			'\n' +
			'       </div>\n' +
			'   </div>\n' +
			'    \n' +
			'</div>'


/**
 * @Description: 修改
 * @author zky
 * @date 2020/3/30
*/
		var areah = ['1250px', '700px'];


		if(pw < 1400){
			areah = ['1250px', '550px'];
		}




		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			area:areah,
			skin: 'yourClass',
			content: html
		});

		tcopenList03(1, 100000, cityname, areaname, streetname, type);



	}

	function tcopenList03(pageIndex, pageSize, city, area, street, titleName) {

		var json = {
			pageIndex: pageIndex,
			pageSize: pageSize,
			city: city,
			area: area,
			street: street,
			titleName: titleName,

		};
		$.ajax({
			url: callurl + "TitlesInfo",
			data: json,
			type: "post",
			dataType: "JSON",
			success: function(res) {
				// 弹窗分页
				var dataList = res;
				var imgarray = 'img/new0115/新.png';
				// 0313  // 页面序号
				var dqinde = '';
				laypage.render({
					elem: 'qylist',
					count: dataList.length,
					limit: 8,
					prev: '《',
					next: '》',
					jump: function(obj) {
						//模拟渲染
						document.getElementById('biuuu_city_list').innerHTML = function() {
							var arr = [],
								thisData = dataList.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
							layui.each(thisData, function(index, item) {
								// console.log(obj.curr * obj.limit - 8);
								if (item.Iszg == '已整改') {
									imgarray = 'img/new0115/icon-y.png';
								} else if (item.Iszg == '未整改') {
									imgarray = 'img/new0115/icon-w.png';
								} else {
									imgarray = 'img/new0115/新.png';
								}
								// 0313
								var str = '<img class="show-02-fl-01-img" src="' + imgarray +
									'" alt="" style="width:15px;height:24px; float:left ; margin-top:10px; margin-right:10px;" /></div>';
								arr.push(' <li class="qi-tcc-list-li" onclick="toMapid(' + item.Id + ')">\n' +
									'' + str +
									'                       <div class="qi-tcc-list-item-02 fl">' + item.Name + '</div>\n' +
									'                       <div class="qi-tcc-list-item-03 fr">' + item.Date + '</div>\n' +
									'                   </div>\n' +
									'               </li>');
							});
							return arr.join('');
						}();
					}
				});


			},
			error: function(xml) {
				console.log(xml);
			}
		});

	}




});



// 企业环评分析
var myChart02 = echarts.init(document.getElementById("table02"));
option02 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		data: [
			{
				icon: 'circle',
				name: '信访局'
			},
			{
				icon: 'circle',
				name: '网信办'
			},
			{
				icon: 'circle',
				name: '公安分局'
			},
			{
				icon: 'circle',
				name: '白云街道'
			},
			{
				icon: 'circle',
				name: '望春街道'
			}
		],
		textStyle: {
			color: 'white',
		},
		borderRadius: 100,
		left: '5%'
	},
	grid: {
		left: '10%',
		right: '10%',
		top: '20%',
		containLabel: true
	},
	series: [{
		name: '企业环评分析',
		type: 'pie',
		radius: '55%',
		// 0204修改
		center: ['50%', '60%'],
		data: [
			{
				value: '20',
				name: '信访局',
				itemStyle: {
					color: '#13b5b1'
				}
			},
			{
				value: '30',
				name: '网信办',
				itemStyle: {
					color: '#eb6877'
				}
			},
			{
				value: '12',
				name: '公安分局',
				itemStyle: {
					color: '#595fb5'
				}
			},
			{
				value: '36',
				name: '白云街道',
				itemStyle: {
					color: '#eaeb9c'
				}
			},
			{
				value: '22',
				name: '望春街道',
				itemStyle: {
					color: '#ff9c23'
				}
			}
		],
		itemStyle: {
			borderWidth: 5,
			borderColor: '#1f3e49',
			// emphasis: {
			// 	shadowBlur: 10,
			// 	shadowOffsetX: 0,
			// 	shadowColor: 'rgba(0, 0, 0, 0.5)'
			// }
		},
		label: {
			position: 'inside',
			normal: {
				position: 'right',
				formatter: '{b|{b}}\n{c|{c}}',
				rich: {
					a: {
						fontSize: 14,
						lineHeight: 20
					},
					b: {
						fontSize: 14,
						lineHeight: 20,
					},
					c: {
						fontSize: 16,
						ineHeight: 20,
						color: '#fff'

					}
				}
			},

		},

	}]
};
if (option02 && typeof option02 === "object") {
	myChart02.setOption(option02, true);
}




function char(cityName, areaname, streetname) {
	// 0401
	// $(".swiper-wrapper01").html("");

	var json = {
		city: cityName,
		//  2020 1.4 修改
		area: areaname,
		street: streetname
	};

	console.log(json);


$.ajax({
		url: callurl + "CountOfCompanyType02",
		type: "post",
		dataType: "JSON",
		data: json,
		success: function(res) {
			console.log(res)
			var list = res;
			// 0401获取最大值
			var mustmun = Math.max.apply(Math,list.map(function (res) {
				return res.Count
			}));
			var wh = 50;
			var bqslide  =(Math.ceil(list.length/5)) * 5 -  list.length;
			console.log(bqslide);
			$(".swiper-wrapper01").html('');
			for (var i = 0; i < list.length; i++) {
				// console.log(Math.max(list))
				wh = (list[i].Count / mustmun) * 50;
				var html= '<div class="swiper-slide">\n' +
					'\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-01-c clearfix">\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-01 fl">\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-01-01">'+(i+1)+'.</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-02 fl">\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-01-02" title="'+list[i].Name+'">'+list[i].Name+'</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-03 fl" style="width: '+wh+'%">\n' +
					'\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-04 fr">\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="mode01-table-01-04">'+list[i].Count+'</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t\t\t\t</div>';
				$(".swiper-wrapper01").append(html);
			}

			for(var j = 0;j<bqslide;j++){
				var html02  ='<div class="swiper-slide"></div>';
				$(".swiper-wrapper01").append(html02);
			}
		},
		error: function(xml) {
			console.log(xml);
		}
	});




	// 企业环评分析
	$.ajax({
		url: callurl + "CountOfHpCompanys",
		data: json,
		type: "post",
		dataType: "JSON",
		success: function(res) {
			console.log(res)
			var IsEIAProc = res[0].Yes;
			var IsNotEIAProc = res[0].No;
			// myChart02.setOption({
			// 	series: [{
			// 		data: [{
			// 				value: IsEIAProc,
			// 				name: '局信网',
			// 				itemStyle: {
			// 					color: '#13b5b1'
			// 				}
			// 			},
			// 			{
			// 				value: IsNotEIAProc,
			// 				name: '公安',
			// 				itemStyle: {
			// 					color: '#eb6877'
			// 				}
			// 			}
			// 		]
			// 	}]
			// });
		},
		error: function(xml) {
			console.log(xml);
		}
	});

	// 头部大4个数据  //头部仅为三个数据
	$.ajax({
		url: callurl + "DataOfTitle",
		type: "post",
		data: json,
		dataType: "JSON",
		success: function(res) {
			var list = res;
			// 总体企业
			var EnterpriseCount = list[0].Count;
			// 超期未改企业数
			var CountOfPc = list[0].OutOfDate;
			var Count = list[0].AllOfCompany;

			// 总排查次数
			var TotalInspectionTimes = list[0].CountOfPc;

			// 编率 2020 1.4
			//var EmergPlanRatio = list[0].Yjbz;

			$("#mode4-01").html(EnterpriseCount);

			$("#mode4-02").html(CountOfPc);

			$("#mode4-04").html(TotalInspectionTimes);
			// 2020 1.4  $("#mode4-05").html(EmergPlanRatio + "%");

		},
		error: function(xml) {
			console.log(xml);
		}
	});


}



// 跳转
function toMapid(id) {
	// window.location.href = "map.html?city=" + encodeURI(cityname)  + "&area="+encodeURI(areaname) + "&stree=" + encodeURI(streetname) + "&id=" + id;
	layer.closeAll();
	showTc(id);
}

// 跳转 0117修改
$(document).on("click", ".map-big", function() {
	window.location.href = "map.html?city=" + encodeURI(cityname) + "&area=" + encodeURI(areaname) + "&stree=" +
		encodeURI(streetname) + "&id=";
})


function dw(city, area, street) {
	// map.clearOverlays();
	
	var aArr = [
		{
			name: '中山家园',
			lng: '121.175444',
			lat: '30.068893',
			fxcd: '低',
			id: '14'
		},
		{
			name: '泽民阳光',
			lng: '121.532481',
			lat: '29.888103',
			fxcd: '低',
			id: '15'
		},
		{
			name: '胜丰佳苑',
			lng: '121.531977',
			lat: '29.889418',
			fxcd: '低',
			id: '16'
		},
		{
			name: '六和嘉园',
			lng: '121.532030',
			lat: '29.890567',
			fxcd: '低',
			id: '17'
		},
		{
			name: '永和居易',
			lng: '121.533331',
			lat: '29.895865',
			fxcd: '低',
			id: '18'
			
		},
		{
			name: '顾家公寓',
			lng: '121.487150',
			lat: '29.907881',
			fxcd: '低',
			id: '19'
		},
		{
			name: '清林闲庭',
			lng: '121.536122',
			lat: '29.909410',
			fxcd: '低',
			id: '20'
		},
		{
			name: '柳馨花园',
			lng: '121.535484',
			lat: '29.872254',
			fxcd: '低',
			id: '21'
		},
		{
			name: '欢乐家园',
			lng: '121.532424',
			lat: '29.875201',
			fxcd: '低',
			id: '22'
		},
		{
			name: '欢乐精品园',
			lng: '121.532224',
			lat: '29.877762',
			fxcd: '中',
			id: '23'
		},
		{
			name: '文苑风荷',
			lng: '121.531466',
			lat: '29.881890',
			fxcd: '低',
			id: '24'
		},
		{
			name: '柳西新村',
			lng: '121.536394',
			lat: '29.874821',
			fxcd: '低',
			id: '25'
		},
		{
			name: '万安小区',
			lng: '121.535068',
			lat: '29.881881',
			fxcd: '低',
			id: '26'
		},
		{
			name: '文化家园',
			lng: '121.533829',
			lat: '29.881406',
			fxcd: '中',
			id: '27'
		},
		{
			name: '胜丰东苑',
			lng: '121.534782',
			lat: '29.889627',
			fxcd: '中',
			id: '29'
		},
		{
			name: '钱南小区',
			lng: '121.535015',
			lat: '29.891496',
			fxcd: '高',
			id: '30'
			
		},
		{
			name: '钱东小区',
			lng: '121.536666',
			lat: '29.894634',
			fxcd: '低',
			id: '31'
		},
		{
			name: '胜丰小区',
			lng: '121.536035',
			lat: '29.888363',
			fxcd: '低',
			id: '28'
		}
	];
	var point;
	for (var i = 0; i < aArr.length; i++) {
		point = new BMap.Point(aArr[i].lng, aArr[i].lat);
		addMarker(point, aArr[i].fxcd, aArr[i].name, aArr[i].id);
		
		var opts = {
		    position: new BMap.Point(aArr[i].lng, aArr[i].lat), // 指定文本标注所在的地理位置
		    offset: new BMap.Size(20, -20) // 设置文本偏移量
		};
		// 创建文本标注对象
		var label = new BMap.Label(aArr[i].name, opts);
		// 自定义文本标注样式
		label.setStyle({
		    color: '#333333',
			backgroundColor: 'white',
		    borderRadius: '1px',
		    borderColor: '#ccc',
		    padding: '2px',
		    fontSize: '16px',
		    height: '20px',
		    lineHeight: '20px',
		    fontFamily: '微软雅黑'
		});
		map.addOverlay(label);
		
	}
	map.centerAndZoom(point, 16);
	var json = {
		city: city,
		area: area,
		street: street
	};
	// $.ajax({
	// 	url: callurl + "CompanysMapXY",
	// 	data: json,
	// 	type: "post",
	// 	dataType: "JSON",
	// 	success: function(res) {
	// 		console.log(res)
	// 		var point;
	// 		for (var i = 0; i < res.length; i++) {
	// 			point = new BMap.Point(res[i].lng, res[i].lat);
	// 			addMarker(point, res[i].Qyhbfx, res[i].Name, res[i].Id);
	// 		}
	// 		map.centerAndZoom(point, 16);
	// 	},
	// 	error: function(xml) {
	// 		console.log(xml);
	// 	}
	// });

}

// 高风险点位
function addMarker(point, name, name01, id) {

	var myIcon = new BMap.Icon("img/new0116/icon-01.png", new BMap.Size(25, 37));

	if (name == "高") {
		myIcon = new BMap.Icon("img/new0116/icon-01.png", new BMap.Size(25, 37));
	} else if (name == "中") {
		myIcon = new BMap.Icon("img/new0116/icon-02.png", new BMap.Size(25, 37));
	} else {
		myIcon = new BMap.Icon("img/new0116/icon-03.png", new BMap.Size(25, 37));
	}


	var marker = new BMap.Marker(point, {
		icon: myIcon
	});


	var arraymarker = {};
	arraymarker.idname = name01
	arraymarker.sqid = id;
	arraymarker.name01 = name01;
	marker.customData = arraymarker;



	map.addOverlay(marker)


	var opts = {
		position: point, // 指定文本标注所在的地理位置
		offset: new BMap.Size(-20, -40) //设置文本偏移量
	}
	var label = new BMap.Label(name01, opts); // 创建文本标注对象
	label.setStyle({
		color: "#fff",
		fontSize: "18px",
		height: "20px",
		lineHeight: "20px",
		fontFamily: "微软雅黑",
		border: 'none',
		background: "transparent"
	});

	// map.addOverlay(label);


	// 点击点位
	marker.addEventListener('click', function(e) {
		// var point_n = new BMap.Point(e.point.lng,e.point.lat);
		var id = e.target.customData.sqid;
		// console.log(id);
		showTc(id);

	});


	// 鼠标滑动

	marker.addEventListener("mouseover", function(e) {
		var name01 = e.target.customData.name01;
		var opts = {
			title: '企业名称'
		};
		//2020.7.6王栩彬注释
		// var point = new BMap.Point(e.point.lng, e.point.lat);
		var name01 = e.target.customData.name01;
		var id01 = e.target.customData.sqid;
		var infoWindow = new BMap.InfoWindow(name01, opts);
		var point = new BMap.Point(e.point.lng, e.point.lat);
		var sname = e.target.customData.idname


		openwin02(id01, point, sname);
		gsid = id01;
		//this.openInfoWindow(infoWindow);


	});
}

function isyes(typenum) {
	var typename = "";
	if (typenum == "有" || typenum == "是") {
		typename = "是";
	} else {
		typename = "否";
	}

	return typename;

}

function openwin02(id, point, sname) {
	console.log(id);
	var json03 = {
		Id: id
	};
	console.log(json03)
	$.ajax({
		url: callurl + "GetCompanyNewInfoById",
		data: json03,
		type: "post",
		dataType: "JSON",
		success: function(res) {
			console.log(res);
			var list = res[0];
			var html = '';

			var info = "";
			// 排查记录
			$.ajax({
				url: callurl + "GetPcrzLstByCompanyId",
				data: json03,
				type: "post",
				dataType: "JSON",
				success: function(res02) {
					console.log(res02);
					var list02 = res02[0];

					var EnvironmentalInspectionList = list.EnvironmentalInspectionList;
					if (list02.length > 0) {
						for (var i = 0; i < list02.length; i++) {
							html += '<div class="show-02-fl-03-01">' + list02[i].Date + '排查记录</div>';
						}
					}

				},
				error: function(xml) {
					console.log(xml);
				}
			});

			var opts = {
				width: 370, // 信息窗口宽度
				height: 270, // 信息窗口高度
				// title : "信息窗口" , // 信息窗口标题
				// enableMessage:true//设置允许信息窗发送短息
			};
			var filePathimage = "";
			$.ajax({
				url: callurl + "CompanyImage",
				data: json03,
				type: "post",
				dataType: "JSON",
				success: function(res02) {
					console.log(res02);
					var list02 = res02[0];
					
					$.ajax({
						url: callurl + "CompanyJcbInfo",
						data: {
							pageIndex: 1,
							pageSize: 100000,
							Id: id
						},
						type: "post",
						dataType: "JSON",
						success: function(Res) {
							console.log(Res);
							let ResData = Res.data[0]
							
							if (ResData) {
								let sContent = ' <div class="show" data-listid="' + id + '" id="markerInfo" onclick="showTc(' + id + ')">\n' +
									'           <div class="show-container">\n' +
									'               <div class="show-title" style="margin-bottom: 20px;font-size: 24px;">' + sname + '</div>\n' +
									// '               <div class="show-01">行业：' + list.Hylx + '</div>\n' +
									// '               <div class="show-01">地址：' + list.CompanyAddress + '</div>\n' +
									'               <div class="show-02 clearfix">\n' +
									'                   <div class="show-02-fr fl ">\n' +
									// '                       <div class="show-02-fr-title" style="margin-top:5px;">最新环境指数：</div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">①预警信息：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">②街道掌握人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">③涉稳人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">④信访过人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑤网上发帖抵制质疑人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑥有过激言行人员 ：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑦涉增建三四线信访人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑧涉三四线相关线上聊天渠道数量：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                   </div>\n' +
									'               </div>\n' +
									'           </div>\n' +
									'        </div>';
													
								let infoWindow = new BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
								// map.openInfoWindow(infoWindow); // 打开信息窗口
													
								// map.openInfoWindow(infoWindow);
													
								map.openInfoWindow(infoWindow, point);
							}else {
								let sContent = ' <div class="show" data-listid="' + id + '" id="markerInfo" onclick="showTc(' + id + ')">\n' +
									'           <div class="show-container">\n' +
									'               <div class="show-title" style="margin-bottom: 20px;font-size: 24px;">' + sname + '</div>\n' +
									// '               <div class="show-01">行业：' + list.Hylx + '</div>\n' +
									// '               <div class="show-01">地址：' + list.CompanyAddress + '</div>\n' +
									'               <div class="show-02 clearfix">\n' +
									'                   <div class="show-02-fr fl ">\n' +
									// '                       <div class="show-02-fr-title" style="margin-top:5px;">最新环境指数：</div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">①预警信息：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">②街道掌握人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">③涉稳人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">④信访过人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑤网上发帖抵制质疑人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑥有过激言行人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑦涉增建三四线信访人员：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                       <div class="show-02-fr-01"><span class="show-02-fr-span1">⑧涉三四线相关线上聊天渠道数量：</span><span class="show-02-fr-span">' +
									'0' + '</span></div>\n' +
									'                   </div>\n' +
									'               </div>\n' +
									'           </div>\n' +
									'        </div>';
													
								let infoWindow = new BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
								// map.openInfoWindow(infoWindow); // 打开信息窗口
													
								// map.openInfoWindow(infoWindow);
													
								map.openInfoWindow(infoWindow, point);
								
								
								// var infoBox = new BMapLib.InfoBox(map,sContent,{
								// 	boxStyle:{
								// 		background:"rgba(14,50,69,0.8) no-repeat center top"
								// 		,width: "270px"
								// 		,height: "370px"
								// 	}
								// 	,closeIconMargin: "1px 1px 0 0"
								// 	,enableAutoPan: true
								// 	,align: INFOBOX_AT_TOP
								// });
								
								// infoBox.open(this);
								// marker.enableDragging();
								
								
							}
					
						},
						error: function(xml) {
							console.log(xml);
						}
					});
					
				},
				error: function(xml) {
					console.log(xml);
				}
			});



		},
		error: function(xml) {
			console.log(xml);
		}
	});



}


// 排查日志详情高度
var heightarr = $(".datail-page06-03-list");
for (var i = 0; i < heightarr.length; i++) {
	var heightarr01 = $(heightarr[i]).find(".datail-page06-03-list-01").height();
	var heightarr02 = $(heightarr[i]).find(".datail-page06-03-list-02").height();

	if (heightarr01 > heightarr02) {
		$(heightarr[i]).find(".datail-page06-03-list-02").css("height", heightarr01 + "px");
	} else {

	}
}
// 容器大小改变时候
$(window).resize(function() {
	var heightarr = $(".datail-page06-03-list");
	for (var i = 0; i < heightarr.length; i++) {
		var heightarr01 = $(heightarr[i]).find(".datail-page06-03-list-01").height();
		var heightarr02 = $(heightarr[i]).find(".datail-page06-03-list-02").height();
		if (heightarr01 > heightarr02) {
			$(heightarr[i]).find(".datail-page06-03-list-02").css("height", heightarr01 + "px");
		} else {

		}

	}

});



// 关闭详情弹窗  datail-page
$(document).on("click", ".close", function() {
	$("#detail").addClass("hide");
})

// 点击详情弹窗导航
$(document).on("click", ".nav", function() {
	$(this).addClass("nav-a").siblings().removeClass("nav-a");
	var index = $(this).index();
	$(".detail-c").find(".datail-page").addClass("hide");
	$(".detail-c").find(".datail-page").eq(index).removeClass("hide");


	var heightarr = $(".datail-page06-03-list");
	for (var i = 0; i < heightarr.length; i++) {
		var heightarr01 = $(heightarr[i]).find(".datail-page06-03-list-01").height();
		var heightarr02 = $(heightarr[i]).find(".datail-page06-03-list-02").height();
		// console.log(heightarr01);
		// console.log(heightarr02);
		if (heightarr01 > heightarr02) {
			$(heightarr[i]).find(".datail-page06-03-list-02").css("height", heightarr01 + "px");
		} else {
			// $(heightarr[i]).find(".datail-page06-03-list-02").css("height",heightarr01 + "px");

		}
	}


})

//获取评分标准

		
		
// 弹窗
function showTc(id) {
	// alert(id);
	$('#addDf-wrap').html('');
	$.ajax({
		url: callurl03 + "Api/GetAllList_JCB_Add",
		data: {
			ParentId: 2056
		},
		type: "post",
		dataType: "JSON",
		success: function(res) {
			console.log(res);
			console.log(id)
			let wxres1 = res[0].children
			let wxres2 = res[1].children
			let wxres3 = res[2].children
			let wxres4 = res[3].children
			let wxres5 = res[4].children
			
			
		},
		error: function(xml) {
			console.log(xml);
		}
	});
	
	
	
	
	// 清空
	$("#pcrz_qygltzList").html('');
	$("#zgq_img01").html('');
	$("#pcrz_GWdfqkFl").html('');

	layui.use(['form'], function() {
		var form = layui.form;
		// $("#detail").removeClass("hide");
		var json04 = {
			Id: id
		};
		// 企业信息
		$.ajax({
			url: callurl + "SearchCompanyInfo",
			data: json04,
			type: "post",
			dataType: "JSON",
			success: function(res) {
				console.log(res);
				var list = res[0];
				$("#pagegsname").html(list.Name)
				$("#pagegszclxr").html(list.Frxm);
				$("#pagegszctype").html(list.Hylx);
				$("#pagegsjj").html(list.Nr);
				$("#pagegsfr").html(list.Frxm);
				$("#pagegsdz").html(list.Address);
				$("#pagegsdh").html(list.Lxdh);
			},
			error: function(xml) {
				console.log(xml);
			}
		});
		// 企业现场照片
		$.ajax({
			url: callurl + "companyimage",
			data: json04,
			type: "post",
			dataType: "JSON",
			success: function(res06) {
				console.log(res06);
				var list = res06;
				for (var i = 0; i < res06.length; i++) {
					var html = '<div class="datail-page02-list-02-fl fl"><img class="datail-page02-list-02-fl-img" src="' +
						callurl02 + res06[i].filePath + '" alt="" /></div>'
					$("#zgq_img03").append(html);
				}
			},
			error: function(xml) {
				console.log(xml);
			}
		});
		// 企业排查日志
		$.ajax({
			url: callurl + "GetNewPcrzByCompanyId",
			type: "post",
			data: json04,
			dataType: "JSON",
			success: function(res) {
				console.log(res);
				if (res.length == 0) {
					console.log(1111354 + 6944);
					$("#pcrz_qygltzList").html('');
					$("#zgq_img01").html('');
					$("#pcrz_name").html("");
					$("#pcrz_hy").html("");
					$("#pcrz_address").html("");
					$("#pcrz_bh").html("");
					$("#pcrz_date").html("" + '    天气   ' + "" + '   气温   ' + "");
					$("#pcrz_Ddxcsj").html("");
					$("#pcrz_Lkxcsj").html("");
					$("#pcrz_jbqk").html("");
					$("#pcrz_zysb").html("");
					$("#pcrz_zygy").html("");
					$("#pcrz_Sfzlqk").html("");
					$("#pcrz_Zgyj").html("");
					$("#pcrz_Zjjhls").html("");
					$("#pcrz_qygltzList").html("");
					$("#pcrz_Pwkgfhjs_ms02").html("");
					// 排污口规范化建设
					var Pwkgfhjs = list.Pwkgfhjs;
					if (Pwkgfhjs == "规范") {
						$("#pcrz_Pwkgfhjs_ms").find("input").eq(0).prop("checked", true)
					} else {
						$("#pcrz_Pwkgfhjs_ms").find("input").eq(1).prop("checked", true);
						$("#pcrz_Pwkgfhjs_ms02").html("");
					}
				} else {
					var list = res[0];
					$("#pcrz_name").html(list.CompanyName);
					$("#pcrz_hy").html(list.Hylx);
					$("#pcrz_address").html(list.CompanyAddress);
					$("#pcrz_bh").html(list.Bh);
					$("#pcrz_date").html(list.Date + '    天气   ' + list.Tq + '   气温   ' + list.Qw);
					$("#pcrz_Ddxcsj").html(list.Ddxcsj);
					$("#pcrz_Lkxcsj").html(list.Lkxcsj);
					$("#pcrz_jbqk").html(list.CompanyNr);
					$("#pcrz_zysb").html(list.CompanyZysb);
					$("#pcrz_zygy").html(list.CompanyXygy);
					$("#pcrz_Sfzlqk").html(list.Sfzlqk);
					
					$("#pcrz_GWdfqk").html(list.GWdfqk)

					$("#pcrz_Zgyj").html(list.Zgyj);
					$("#pcrz_Zjjhls").html(list.Zjjhls);
					
					//固废附件
					$.ajax({
					    url: callurl03 + 'FileList/GetAllList',
					    data: {
							tableName: 'Pcrz',
							pid: list.Id,
							type: '固废、危废堆放场地情况'
						},
					    type: "post",
					    dataType: "JSON",
					    success: function(Res) {
							console.log(Res)
							
							for(var i = 0; i < Res.length; i++){
								
								if((Res[i].filePath).indexOf("png") != -1 || (Res[i].filePath).indexOf("jpg") != -1 || (Res[i].filePath).indexOf("jpeg") != -1){
									let html = `
										<a href="${callurl02 + Res[i].filePath}" target="_blank"><img src="${callurl02 + Res[i].filePath}" onerror="this.src='img/fj/fj.png';" /></a>
									`;
									$("#pcrz_GWdfqkFl").append(html);
								}else {
									let html = `
										<a href="${callurl02 + Res[i].filePath}" target="_blank"><img src="" onerror="this.src='img/fj/fj.png';" /></a>
									`;
									$("#pcrz_GWdfqkFl").append(html);
								}
							}
							
					    },
					    error: function(xml) {
					        console.log(xml);
					    }
					});
					
					// 排查日志详情高度
					var heightarr = $(".datail-page06-03-list");
					for (var i = 0; i < heightarr.length; i++) {
						var heightarr01 = $(heightarr[i]).find(".datail-page06-03-list-01").height();
						var heightarr02 = $(heightarr[i]).find(".datail-page06-03-list-02").height();
						if (heightarr01 > heightarr02) {
							$(heightarr[i]).find(".datail-page06-03-list-02").css("height", heightarr01 + "px");
						} else {


						}
					}

					// 企业危废列表
					var Qygltz = list.Qygltz;
					var checked = "";
					$.ajax({
						url: callurl + "GetAreaById",
						data: {
							Id: 1
						},
						type: "post",
						dataType: "JSON",
						success: function(res) {
							console.log(res);
							for (var i = 0; i < res.length; i++) {
								if (Qygltz.indexOf(res[i].Name) >= 0) {
									checked = "checked"
								} else {
									checked = '';
								}
								var html = '<input type="checkbox" name="type01[' + i + ']" lay-skin="primary" ' + checked + ' title="' +
									res[i].Name + '" disabled>';
								$("#pcrz_qygltzList").append(html);
								form.render('checkbox');

							}
							if (Qygltz.indexOf(res[4].Name) >= 0) {
								
								var htmls = '<u style="color: #c2c2c2">环保危废台账' + list.Qygltz_qt + '</u>'
								$("#pcrz_qygltzList").append(htmls);
							}
							// var htmls = '<input type="text" id="item44" name="item" placeholder="如果选择其他请录入" style="padding-left: 10px; width: 200px;border: 1px solid #bbbbbb;background: none;outline: none;height: 30px;" />'
							
						},
						error: function(xml) {
							console.log(xml);
						}
					});

					// 排污口规范化建设
					var Pwkgfhjs = list.Pwkgfhjs;
					if (Pwkgfhjs == "规范") {
						$("#pcrz_Pwkgfhjs_ms").find("input").eq(0).prop("checked", true)
					} else {
						$("#pcrz_Pwkgfhjs_ms").find("input").eq(1).prop("checked", true);
						$("#pcrz_Pwkgfhjs_ms02").html(list.Pwkgfhjs_ms);
					}


					// 应急预案

					if (list.Yjyabzqk == "有") {
						$("#pcrz_Yjyabzqk").find("input").eq(0).prop("checked", true);
						$("#pcrz_Yjyabzqk_bah").html("备案号：" + list.Yjyabzqk_bah);
					} else if (list.Yjyabzqk == "无") {
						$("#pcrz_Yjyabzqk").find("input").eq(1).prop("checked", true)
					} else {
						$("#pcrz_Yjyabzqk").find("input").eq(2).prop("checked", true)
					}



					// 整改前
					var json05 = {
						Id: list.Id //公司ID
					};
					$.ajax({
						url: callurl + "BeforeRectTitles",
						data: json05,
						type: "post",
						dataType: "JSON",
						success: function(res05) {
							for (var i = 0; i < res05.length; i++) {
								let titledate = {};
								var json06 = {
									Id: res05[i].Id //titleID
								};
								titledate.title = res05[i].Title;
								var html = '';
								var child = '';
								$.ajax({
									url: callurl + "BeforeRectImageById",
									data: json06,
									type: "post",
									dataType: "JSON",
									success: function(res06) {
										child = '';
										for (var j = 0; j < res06.length; j++) {
											child +=
												'<div class="datail-page02-list-02-fl fl"><a href="' + callurl02 + res06[j].filePath +
												'" rel="exhibit" title="" target="_blank"><img class="datail-page02-list-02-fl-img" src="' +
												callurl02 + res06[j]
												.filePath + '" alt="" /></a></div>'
										}
										html = '<div class="datail-page02-list-01">' + titledate.title +
											'</div><div class="datail-page02-list-02 clearfix zgq_image">' + child + '</div>';
										$("#zgq_img01").append(html);
									},
									error: function(xml) {
										console.log(xml);
									}
								});
							}
						},
						error: function(xml) {
							console.log(xml);
						}
					});


					$.ajax({
						url: callurl + "AfterRectTitles",
						data: json05,
						type: "post",
						dataType: "JSON",
						success: function(res05) {
							for (var i = 0; i < res05.length; i++) {
								let titledate = {};
								var json06 = {
									Id: res05[i].Id //titleID
								};
								titledate.title = res05[i].Title;
								var html = '';
								var child = '';
								$.ajax({
									url: callurl + "AfterRectImageById",
									data: json06,
									type: "post",
									dataType: "JSON",
									success: function(res06) {
										child = '';
										for (var j = 0; j < res06.length; j++) {
											child +=
												'<div class="datail-page02-list-02-fl fl"><a href="' + callurl02 + res06[j].filePath +
												'" rel="exhibit" title="" target="_blank"><img class="datail-page02-list-02-fl-img" src="' +
												callurl02 + res06[j].filePath + '" alt="" /></a></div>'
										}
										html = '<div class="datail-page02-list-01">' + titledate.title +
											'</div><div class="datail-page02-list-02 clearfix zgq_image">' + child + '</div>';
										console.log("整改后！")
										$("#zgh_img01").append(html);
									},
									error: function(xml) {
										console.log(xml);
									}
								});
							}
						},
						error: function(xml) {
							console.log(xml);
						}
					});


					getfj( list.Id,"环评手续","01");
					getfj( list.Id,"验收手续","02");
					getfj( list.Id,"排污许可证","03");
					getfj( list.Id,"危废处置协议","04");



				}
			},
			error: function(xml) {

			},

		});




	})
}


// 0601
function getfj(id,type,tab){
	$("#fjck"+tab).html("");
	var json  ={
		pid: id,
		type:type,
		tablename:'Pcrz'
	};
	$.ajax({
	    url: callurl03 + "FileList/GetAllList",
	    data:json,
	    type: "post",
	    dataType: "JSON",
	    success:function(res) {
	        console.log(res);

	        var fil ='';
	        var classned ='datail-page06-04-a-01-img';

	        for(var i=0;i<res.length;i++){
	        	if((res[i].filePath).indexOf("png") != -1 || (res[i].filePath).indexOf("jpg") != -1 || (res[i].filePath).indexOf("jpeg") != -1){
					fil = callurl02 + res[i].filePath;
					classned = 'datail-page06-04-a-01-img';
				}else {
					fil = '';
					classned = 'datail-page06-04-a-01-img02';
				}
	        	var html = '<a href="'+callurl02+ res[i].filePath+'" target="_blank"  class="datail-page06-04-a">\n' +
					'\t\t\t\t\t\t\t\t\t\t<div class="datail-page06-04-a-01"><img class="'+classned+'" src="'+fil+'" onerror="this.src=\'img/fj/fj.png\'" alt="" /></div>\n' +
					'\t\t\t\t\t\t\t\t\t\t<div class="datail-page06-04-a-02">'+res[i].fileName+'</div>\n' +
					'\t\t\t\t\t\t\t\t\t</a>'

				$("#fjck"+tab).append(html);
			}
	    },
	    error:function(xml){
	        console.log(xml);
	    }
	});

}


// 0228修改 刷新
$(document).on("click", "#shuaxin", function() {
	window.location.reload();
})




function GetRequest() {
	var url = window.location.href;
	console.log(decodeURI(url));
	var theRequest01 = url.split('?City=')[1];
	var theRequest01 = theRequest01.split('&area')[0];
	var theRequest02 = url.split('&area=')[1];
	var theRequest02 = theRequest02.split('&Street')[0];
	var theRequest03 = url.split('&Street=')[1];
	var theRequest03 = theRequest03.split('&id')[0];
	//var theRequest02=(theRequest01.split('&area=')[0]);
	//var theRequest04=(theRequest03.split('&id=')[1]);
	var s = decodeURI(theRequest01);
	var q = decodeURI(theRequest02);
	var j = decodeURI(theRequest03);
	cityname = s;
	areaname = q;
	streetname = j;
	var ids = [];
	var josnzz = {
		city: getCookie("City"),
		area: getCookie("Area"),
		street: getCookie("Street")
	}
	$.ajax({
		url: callurl + "GetAllofAreaInfo",
		data: josnzz,
		type: "post",
		dataType: "JSON",
		async: false,
		success: function(res) {
			console.log(res);
			// 0205修改
			datas = res;
			var list01 = res;
			var city01 = cityname; //city01  是city的id
			var areaname01 = areaname; //areaname01  是area的id
			var streename01 = streetname; //streename01  是stree的id
			for (var i = 0; i < list01.length; i++) {
				if (list01[i].name1 == cityname) {
					city01 = list01[i].id;
					var list02 = list01[i].child;
					if (areaname01 !== "") {
						for (var j = 0; j < list02.length; j++) {
							if (list02[j].name1 == areaname) {
								areaname01 = list02[j].id;
								var list03 = list02[j].child;
								if (streename01 !== "") {
									for (var k = 0; k < list03.length; k++) {
										if (list03[k].name1 == streetname) {
											streename01 = list03[k].id;
										}
									}
								}
							}
						}
					}
				}
			}
			if (areaname01 == "") {
				ids = [city01];
			} else if (streename01 == "") {
				ids = [city01, areaname01];
			} else {
				ids = [city01, areaname01, streename01];
			}
		},
		error: function(xml) {
			console.log(xml);
		}
	});
	$('#mulselectbox1').FMulSelectSetVal(ids);
}

