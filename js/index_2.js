var maps = new BMap.Map("maps"); // 创建Map实例
maps.centerAndZoom(new BMap.Point(121.495549, 29.878656), 15); //初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
maps.addControl(new BMap.MapTypeControl({
	mapTypes: [
		BMAP_NORMAL_MAP,
		// BMAP_HYBRID_MAP,
		BMAP_SATELLITE_MAP
	]
}));
maps.setMapType(BMAP_SATELLITE_MAP);
maps.setCurrentCity("宁波海曙区"); // 设置地图显示的城市 此项是必须设置的
maps.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

var localSearch = new BMap.LocalSearch(maps);
localSearch.enableAutoViewport(); //允许自动调节窗体大小




// function searchByStationName() {
// 	map.clearOverlays(); //清空原来的标注
// 	var keyword = document.getElementById("text_").value;
// 	var keyworder = document.getElementById("texter").value;
// 	var pp = 0;
// 	var jing = ''
// 	var wei = ''
// 	var jing1 = ''
// 	var wei1 = ''
// 	localSearch.setSearchCompleteCallback(function(searchResult) {
// 		var poi = searchResult.getPoi(0);
// 		map.centerAndZoom(poi.point, 13);
// 		var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)); // 创建标注，为要查询的地方对应的经纬度
// 		map.addOverlay(marker);
// 		// var driving = new BMap.DrivingRoute(map, { 
// 		// 	renderOptions: { 
// 		// 		map: map, 
// 		// 		autoViewport: true 
// 		// 	} 
// 		// });
// 		if (pp == 0) {
// 			pp = 1;
// 			jing = poi.point.lng;
// 			wei = poi.point.lat;
// 		}else if (pp == 1) {
// 			pp = 0;
// 			jing1 = poi.point.lng;
// 			wei1 = poi.point.lat;
// 			var p1 = new BMap.Point(jing,wei);
//         	var p2 = new BMap.Point(jing1,wei1);
// 			var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
//         	driving.search(p1, p2);
// 		}
// 		console.log(poi.point.lng)
// 		console.log(poi.point.lat)
// 		// var start = new BMap.Point(document.getElementById("result_"));
// 		// var end = new BMap.Point(document.getElementById("resulter"));
// 		// console.log(start);
// 		// driving.search(start, end);
// 		// marker.addEventListener("click", function() {
// 		// });
// 		// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

// 	});
// 	localSearch.search(keyword);
// 	localSearch.search(keyworder)
//   }






// maps.setMapStyle({
// 	styleJson: [{
// 		// "featureType": "road",
// 		"elementType": "all",
// 		"stylers": {
// 			"color": "#ffffff",
// 			"visibility": "off"
// 		}
// 	}]
// 	// "features": ["road", "water", "land", "building", "point"],
// 	// "style": "normal"
// });


var myChart2 = echarts.init(document.getElementById("discountData2"));
var myChart3 = echarts.init(document.getElementById("discountData3"));

var option2 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		top: '6%',
		left: '5%',
		right: '4%',
		bottom: '1%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		axisTick: {
			alignWithLabel: true
		},
		axisLabel: {
			textStyle: {
				color: 'white',
			},
			interval: 0,
			rotate: 30
		},
		axisLine: {
			lineStyle: {
				color: 'white',
				fontSize: '20px'
			}
		},
	}],
	yAxis: [{
		type: 'value',
		axisLabel: {
			textStyle: {
				color: 'white',
			},
		},
		axisLine: {
			lineStyle: {
				color: 'white'
			}
		},
		axisTick: { //y轴刻度线
			show: false
		}
	}],
	series: [{
		name: '-(㎡)',
		type: 'bar',
		barWidth: '60%',
		data: [],
		label: {
			show: true,
			position: 'top',
			color: 'white'
		},
		itemStyle: {
			normal: {
				color: '#40E0D0'
			}
		}
	}]
};
var option3 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		data: [{
				icon: 'circle',
				name: 'A级'
			},
			{
				icon: 'circle',
				name: 'B级'
			},
			{
				icon: 'circle',
				name: 'C级'
			},
		],
		textStyle: {
			color: 'white',
		},
		borderRadius: 100,
		top: '2%',
		left: '28%'
	},
	grid: {
		left: '10%',
		right: '10%',
		top: '1%',
		bottom: '1%',
		containLabel: true
	},
	series: [{
		name: '土地状态',
		type: 'pie',
		radius: '55%',
		// 0204修改
		center: ['50%', '58%'],
		data: [
			// {
			// 	value: '20',
			// 	name: 'A级',
			// 	itemStyle: {
			// 		color: '#00CED1'
			// 	}
			// },
			// {
			// 	value: '24',
			// 	name: 'B级',
			// 	itemStyle: {
			// 		color: '#00CED1'
			// 	}
			// },
			// {
			// 	value: '12',
			// 	name: 'C级',
			// 	itemStyle: {
			// 		color: '#00CED1'
			// 	}
			// }
		],
		itemStyle: {
			borderWidth: 5,
			borderColor: '#1f3e49',
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
						// color: '#fff'
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

myChart2.setOption(option2, true);
myChart3.setOption(option3, true);

$('#searchly').on('input', function () {
	var searchly = $(this).val();
	if (searchly == '') {
		$('#lyshaix1').val('')
		$('#lyshaix2').val('')
		$('#lyshaix3').val('')
		$('#lfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#lfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#lfang3 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist2('')
	}
})
$('#seabutly').on('click', function () {
	var searchly = $('#searchly').val()
	if (searchly) {
		$('#lyshaix1').val('')
		$('#lyshaix2').val('')
		$('#lyshaix3').val('')
		$('#lfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#lfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#lfang3 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist2(searchly)
	}
})

// bblist2('')
function bblist2(lymc, level, jd, jzmj1, jzmj2) {
	var url = "system/ly/list";
	var data = {
		pageNum: 1,
		pageSize: 1,
		lymc: lymc,
		level: level,
		jd: jd,
		jzmj1: jzmj1,
		jzmj2: jzmj2
	}
	$.ajax({
		url: ajaxUrl + url,
		data: data,
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			if (res.code == 401) {
				window.location.replace('login.html');
			}
			if (res.rows[0] && res.total > 0) {
				$('#lypage2').show();
				layui.use('laypage', function () {
					var laypage = layui.laypage;
					laypage.render({
						elem: 'lypage2',
						count: res.total,
						limit: 7,
						groups: 3, //连续页码个数
						prev: '＜',
						next: '＞',
						layout: ['prev', 'page', 'next', 'count'],
						jump: function (obj, first) {
							$.ajax({
								url: ajaxUrl + url,
								data: {
									pageNum: obj.curr,
									pageSize: 7,
									lymc: lymc,
									level: level,
									jd: jd,
									jzmj1: jzmj1,
									jzmj2: jzmj2
								},
								type: "get",
								dataType: "JSON",
								headers: {
									'Authorization': localStorage.getItem("token")
								},
								success: function (Res) {
									var nodetext = '';
									// console.log(Res)
									layui.each(Res.rows, function (index, item) {
										nodetext += '<li onclick="openwin02(' + item.id + ')">'
										nodetext += '<div class="search_li clearfix">'
										nodetext += '<div class="sear_left">'
										nodetext += '<img src="img/new0116/index-address.png" >'
										nodetext += '<span>' + (index + 1) + '</span>'
										nodetext += '</div>'
										nodetext += '<div class="sear_right">'
										nodetext += '<p>' + item.lymc + '</p>'
										nodetext += '<p>' + item.location + 123 + '</p>'
										nodetext += '</div>'
										nodetext += '</div>'
										nodetext += '</li>';

									});
									document.getElementById('seaList2').innerHTML = nodetext;
								}
							});
						}
					});
				})
			} else {
				$('#seaList2').html('');
				$('#lypage2').hide();
			}
		}
	});
};

// dws2()
function dws2() {
	//饼图统计
	$.ajax({
		url: ajaxUrl + 'system/tongji/getlevelly',
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res)
			var datas = res.data;
			var lengdata = [];
			var serdata = [];
			for (let key in datas) {
				var obj = {};
				obj.icon = 'circle',
					obj.name = key,
					lengdata.push(obj);
				var objs = {};
				objs.value = datas[key];
				objs.name = key;
				objs.itemStyle = {
					color: '#00CED1'
				};
				serdata.push(objs);
			}
			myChart3.setOption({
				legend: [{
					data: lengdata
				}],
				series: [{
					data: serdata
				}]
			});
		},
	});
	//列表
	var point;
	$.ajax({
		url: ajaxUrl + 'system/ly/list',
		data: {
			pageNum: 1,
			pageSize: 1000
		},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res);
			var resData = res.rows;
			var point;
			var cfang1 = [];
			var cfang2 = [];
			var jzmj = resData;
			for (var i = 0; i < resData.length; i++) {
				if (cfang1.indexOf(resData[i].level) === -1) {
					cfang1.push(resData[i].level);
				}
				if (cfang2.indexOf(resData[i].jd) === -1) {
					cfang2.push(resData[i].jd);
				}
				if (resData[i].jingdu) {
					point = new BMap.Point(resData[i].jingdu, resData[i].weidu);
					addMarker02(point, resData[i].id);

					var opts = {
						position: new BMap.Point(resData[i].jingdu, resData[i].weidu), // 指定文本标注所在的地理位置
						offset: new BMap.Size(16, -16) // 设置文本偏移量
					};
					// 创建文本标注对象
					var label = new BMap.Label(resData[i].lymc, opts);
					// 自定义文本标注样式
					label.setStyle({
						color: '#333333',
						backgroundColor: 'white',
						borderRadius: '2px',
						borderColor: '#ccc',
						padding: '3px',
						fontSize: '15px',
						height: '20px',
						lineHeight: '20px',
						fontFamily: '微软雅黑'
					});
					maps.addOverlay(label);
				}
			}
			jzmj.sort(function (a, b) {
				return (parseFloat(b.jzmj) - parseFloat(a.jzmj))
			})
			var shuliang = ''
			shuliang += '<p>' + res.total + '</p>'
			$('#numberofbuildings').append(shuliang);
			var lyhtmls = '';
			var mylouyu = [];
			var mylouyumj = [];
			for (var k = 0; k < 8; k++) {
				mylouyu.push(jzmj[k].lymc);
				mylouyumj.push(jzmj[k].jzmj);

				lyhtmls += '<tr>'
				lyhtmls += '<td>' + (k + 1) + '</td>'
				lyhtmls += '<td>' + jzmj[k].lymc + '</td>'
				lyhtmls += '<td>' + jzmj[k].jzmj + '</td>'
				lyhtmls += '</tr>'
			}
			$('#dikuaicon2').append(lyhtmls);
			myChart2.setOption({
				xAxis: [{
					data: mylouyu
				}],
				series: [{
					data: mylouyumj
				}]
			});

			maps.centerAndZoom(new BMap.Point(121.520407, 29.860611), 16);
			//搜索选项
			var cfhtml = ''
			for (var j = 0; j < cfang1.length; j++) {
				cfhtml += '<span data="' + cfang1[j] + '">' + cfang1[j] + '</span>'
			}
			$('#lfang1').append(cfhtml);
			var cfhtmls = ''
			for (var j = 0; j < cfang2.length; j++) {
				cfhtmls += '<span data="' + cfang2[j] + '">' + cfang2[j] + '</span>'
			}
			$('#lfang2').append(cfhtmls);

			//搜索筛选
			$('#lfang1 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#lyshaix1').val(numdata)
				$('#searchly').val('');
				bblist2('', numdata, $('#lyshaix2').val());
			})
			$('#lfang2 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#lyshaix2').val(numdata)
				$('#searchly').val('');
				bblist2('', $('#lyshaix1').val(), numdata);
			})

			$('#lfang3 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#lyshaix3').val(numdata)
				$('#searchly').val('');
				var numsplit = numdata.split(',');
				bblist2('', $('#lyshaix1').val(), $('#lyshaix2').val(), numsplit[0], numsplit[1]);
			})
		}
	});

}

// 高风险点位
function addMarker02(point, itemid) {

	var myIcon = new BMap.Icon("img/new0116/icon-11.png", new BMap.Size(18, 18));

	// if (name == "高") {
	// 	myIcon = new BMap.Icon("img/new0116/icon-01.png", new BMap.Size(25, 25));
	// } else if (name == "中") {
	// 	myIcon = new BMap.Icon("img/new0116/icon-02.png", new BMap.Size(25, 25));
	// } else {
	// 	myIcon = new BMap.Icon("img/new0116/icon-03.png", new BMap.Size(25, 25));
	// }

	var marker = new BMap.Marker(point, {
		icon: myIcon
	});

	// var marker = new BMap.Marker(point);

	var arraymarker = {};
	arraymarker.itemid = itemid
	marker.customData = arraymarker;

	maps.addOverlay(marker)

	//指中点位
	marker.addEventListener('mouseover', function (e) {
		// var point_n = new BMap.Point(e.point.lng,e.point.lat);
		var id = e.target.customData.sqid;
	});

	// 点击点位
	marker.addEventListener("click", function (e) {
		// console.log(e.target.customData)
		var point = new BMap.Point(e.point.lng, e.point.lat);
		var itemid = e.target.customData.itemid;

		openwin02(itemid);
		//this.openInfoWindow(infoWindow);

	});
}

function openwin02(id) {
	var opts = {
		width: 320, // 信息窗口宽度
		height: 480, // 信息窗口高度
		// title : "信息窗口" , // 信息窗口标题
		// enableMessage:true, //设置允许信息窗发送短息
		// message: 'zhe'
	};
	$.ajax({
		url: ajaxUrl + 'system/ly/' + id,
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res);
			var resdata = res.data;
			if (resdata.jingdu) {
				var point = new BMap.Point(resdata.jingdu, resdata.weidu);
				var sContent = '';
				sContent += '<div class="boxbules-wrap">'
				sContent += '<div class="boxbules">'
				sContent += '<div>' + resdata.lymc + '</div>'
				sContent += '</div>'
				sContent += '<div class="popupbox">'
				sContent += '<div class="popupbox-wrap popaddimg">'
				if (resdata.photo) {
					sContent += '<img src="' + ajaxImg + resdata.photo.split(',')[0] + '" />'
				} else {
					sContent += '<img src="img/new0116/dasha.jpg" />'
				}
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>①楼宇名称：</p><span>' + resdata.lymc + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>②级别：</p><span>' + resdata.level + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>③乡镇街道：</p><span>' + resdata.jd + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>④投用年份：</p><span>' + resdata.year + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>⑤地点：</p><span>' + resdata.location + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>⑥电话：</p><span>' + resdata.lxr + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap clicker" id="tfen">'
				sContent += '<span onclick="clicker()">台风、洪水预警工作&gt;&gt;</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap popfloat">'
				sContent += '<span onclick="boxchuang2(' + id + ')">更多&gt;&gt;</span>'
				sContent += '</div>'
				sContent += '</div>'
				sContent += '</div>'

				var infoWindow = new BMap.InfoWindow(sContent, opts);

				maps.openInfoWindow(infoWindow, point);
				// $(function() {
				// 	$('.BMap_top').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_center').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').next().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').next().next().html('')
				// })
			} else {
				boxchuang2(id)
			}

		},
	});
}

function boxchuang2(id) {
	$('#tanchuang2').show();
	$.ajax({
		url: ajaxUrl + 'system/ly/' + id,
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res);
			var resdata = res.data;

			$('#louyu').html(resdata.lymc);
			$('#louyu1').html(resdata.lymc);
			$('#louyu2').html(resdata.level);
			$('#louyu3').html(resdata.jd);
			$('#louyu4').html(resdata.year);
			$('#louyu5').html(resdata.location);
			$('#louyu6').html(resdata.ytsx);
			$('#louyu7').html(resdata.jzmj);
			$('#louyu8').html(resdata.symj);
			$('#louyu9').html(resdata.swmj);
			$('#louyu10').html(resdata.ysymj);
			$('#louyu11').html(resdata.kzsswmj);
			$('#louyu12').html(resdata.kzssymj);
			$('#louyu13').html(resdata.zlc);
			$('#louyu14').html(resdata.cg);
			$('#louyu15').html(resdata.zxcd);
			$('#louyu16').html(resdata.lxr);
			$('#louyu17').html(resdata.pjzj);
			$('#louyu18').html(resdata.wyf);
			$('#louyu19').html(resdata.tcw);
			$('#louyu20').html(resdata.jt);
			$('#louyu21').html(resdata.cqf);
			$('#louyu22').html(resdata.bz);

			var iiiii = `<button class="btnexcel" id="exportExcels" name="exportExcels">
			<img src="images/jiadao.png" alt=""><span>导出</span>
		</button>`
			$('#dikuaibuttons').append(iiiii);

			$('#exportExcels').on('click', function () {

				var nodehtml = '';
				nodehtml += '<tr>'
				nodehtml += '<td>楼宇名称</td>'
				nodehtml += '<td>' + resdata.lymc + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>级别</td>'
				nodehtml += '<td>' + resdata.level + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>乡镇街道</td>'
				nodehtml += '<td>' + resdata.jd + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>投用年份</td>'
				nodehtml += '<td>' + resdata.year + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>地点</td>'
				nodehtml += '<td>' + resdata.location + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>用途属性</td>'
				nodehtml += '<td>' + resdata.ytsx + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>建筑面积(㎡)</td>'
				nodehtml += '<td>' + resdata.jzmj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>商业面积(㎡)</td>'
				nodehtml += '<td>' + resdata.symj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>商务面积(㎡)</td>'
				nodehtml += '<td>' + resdata.swmj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>已使用面积(㎡)</td>'
				nodehtml += '<td>' + resdata.ysymj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>可招商商务面积(㎡)</td>'
				nodehtml += '<td>' + resdata.kzsswmj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>总楼层</td>'
				nodehtml += '<td>' + resdata.kzssymj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>层高</td>'
				nodehtml += '<td>' + resdata.cg + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>装修程度</td>'
				nodehtml += '<td>' + resdata.zxcd + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>联系人(手机)</td>'
				nodehtml += '<td>' + resdata.lxr + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>平均租金（元/平方/天）</td>'
				nodehtml += '<td>' + resdata.pjzj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>物业费（元/平方/月）</td>'
				nodehtml += '<td>' + resdata.wyf + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>停车位（个）</td>'
				nodehtml += '<td>' + resdata.tcw + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>交通</td>'
				nodehtml += '<td>' + resdata.jt + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>产权方</td>'
				nodehtml += '<td>' + resdata.cqf + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>备注</td>'
				nodehtml += '<td>' + resdata.bz + '</td>'
				nodehtml += '</tr>'

				$('#test_tbody').html(nodehtml);
				excel = new ExcelGen({
					"src_id": "test_table",
					"show_header": true
				});
				excel.generate();
			})

		},
	});
}
$('#tc_close2').on('click', function () {
	$('#tanchuang2').hide()
})

function clicker() {
	$('#earlywarning').show();
}
$('#tc_close22').on('click', function () {
	$('#earlywarning').hide()
})