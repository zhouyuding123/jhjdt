var map = new BMap.Map("map"); // 创建Map实例
map.centerAndZoom(new BMap.Point(121.495549, 29.878656), 15); //初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
	mapTypes: [
		// BMAP_HYBRID_MAP,
		BMAP_NORMAL_MAP,
		BMAP_SATELLITE_MAP
	]
}));
// map.setMapType(BMAP_HYBRID_MAP);
map.setMapType(BMAP_SATELLITE_MAP);
map.setCurrentCity("宁波海曙区"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放



// map.setMapStyleV2({
//     styleId: 'f2b11aaafff9e81a677e162bc1bbb722'
// });
//
// map.setMapStyleV2({
//     styleId: '669bef5d6f22daf46200f9e025f50903'
// });

// map.setMapStyle({
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

// 绘制面
// var polygon = new BMap.Polygon([
// 	new BMap.Point(121.521242,29.900704),
// 	new BMap.Point(121.523021,29.901142),
// 	new BMap.Point(121.523066,29.900066),
// 	new BMap.Point(121.52179,29.900152),
// 	new BMap.Point(121.52153,29.900242)
// ], {
// 	strokeColor: '#ee3c3f',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#ee3c3f',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon);


var myChart = echarts.init(document.getElementById("discountData"));
var myChart4 = echarts.init(document.getElementById("discountData4"));
var option = {
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
		data: ['编号1', '编号2', '编号3', '编号4', '编号5', '编号6', '编号7', '编号8'],
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
		name: '土地面积(亩)',
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
				color: '#0ba598'
			}
		}
	}]
};

var option4 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		data: [{
				icon: 'circle',
				name: '等待招投标'
			},
			{
				icon: 'circle',
				name: '招投标进行中'
			},
			{
				icon: 'circle',
				name: '已完成招投标'
			},
		],
		textStyle: {
			color: 'white',
		},
		borderRadius: 100,
		top: '1%',
		left: '10%'
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
		radius: '50%',
		// 0204修改
		center: ['50%', '56%'],
		data: [{
				value: '20',
				name: '等待招投标',
				itemStyle: {
					color: '#ee3c3f'
				}
			},
			{
				value: '24',
				name: '招投标进行中',
				itemStyle: {
					color: '#fff819'
				}
			},
			{
				value: '12',
				name: '已完成招投标',
				itemStyle: {
					color: '#5bba33'
				}
			}
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
myChart.setOption(option, true);
myChart4.setOption(option4, true);

$('#searchdk').on('input', function () {
	var searchdk = $(this).val();
	if (searchdk == '') {
		$('#dkshaix1').val('')
		$('#dkshaix2').val('')
		$('#dfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#dfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist1('')
	}
})
$('#seabutdk').on('click', function () {
	var searchdk = $('#searchdk').val()
	if (searchdk) {
		$('#dkshaix1').val('')
		$('#dkshaix2').val('')
		$('#dfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#dfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist1(searchdk)
	}
})
$('#dfang1 span').on('click', function () {
	$(this).addClass('grncli').siblings().removeClass('grncli');
	var numdata = $(this).attr('data');
	$('#dkshaix1').val(numdata)
	$('#searchdk').val('');
	var numsplit = numdata.split(',');
	bblist1('', $('#dkshaix2').val(), numsplit[0], numsplit[1]);

})


bblist1('')

function bblist1(dkmc, jd, mj1, mj2,dkyt) {
	var url = "system/dk/list";
	var data = {
		pageNum: 1,
		pageSize: 1,
		dkmc: dkmc,
		jd: jd,
		mj1: mj1,
		mj2: mj2,
		dkyt:dkyt
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
			console.log(res);
			if (res.code == 401) {
				window.location.replace('login.html');
			}
			if (res.rows[0] && res.total > 0) {
				$('#lypage1').show();
				layui.use('laypage', function () {
					var laypage = layui.laypage;
					laypage.render({
						elem: 'lypage1',
						count: res.total,
						limit: 5,
						groups: 3, //连续页码个数
						prev: '＜＜',
						next: '＞＞',
						layout: ['prev', 'page', 'next', 'count'],
						jump: function (obj, first) {
							$.ajax({
								url: ajaxUrl + url,
								data: {
									pageNum: obj.curr,
									pageSize: 5,
									dkmc: dkmc,
									jd: jd,
									mj1: mj1,
									mj2: mj2,
									dkyt:dkyt
								},
								type: "get",
								dataType: "JSON",
								headers: {
									'Authorization': localStorage.getItem("token")
								},
								success: function (Res) {
									var nodetext = '';
									console.log(Res)
									layui.each(Res.rows, function (index, item) {
										nodetext += '<li onclick="openwin01(' + item.id + ')">'
										nodetext += '<div class="search_li clearfix flfangbuxia">'
										nodetext += '<div class="sear_left">'
										nodetext += '<img src="img/new0116/index-address.png" >'
										nodetext += '<span>' + (index + 1) + '</span>'
										nodetext += '</div>'
										nodetext += '<div class="sear_right">'
										nodetext += '<p>' + item.dkmc + '</p>'
										nodetext += '<p>' + item.location + '</p>'
										nodetext += '</div>'
										nodetext += '</div>'
										nodetext += '</li>';
									});
									document.getElementById('seaList1').innerHTML = nodetext;
								}
							});
						}
					});
				})
			} else {
				$('#seaList1').html('');
				$('#lypage1').hide();
			}
		}
	});
};

dw1()

function dw1() {
	//饼图统计
	$.ajax({
		url: ajaxUrl + 'system/tongji/getZbqk',
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			console.log(res)
			var datas = res.data;
			myChart4.setOption({
				series: [{
					data: [{
							value: datas.red,
							name: '等待招投标',
							itemStyle: {
								color: '#ee3c3f'
							}
						},
						{
							value: datas.yellow,
							name: '招投标进行中',
							itemStyle: {
								color: '#fff819'
							}
						},
						{
							value: datas.green,
							name: '已完成招投标',
							itemStyle: {
								color: '#5bba33'
							}
						}
					]
				}]
			});
		},
	});
	var point;
	$.ajax({
		url: ajaxUrl + 'system/dk/list',
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
			console.log(res);
			var resData = res.rows;
			var point;
			var cfang1 = [];
			var cfang2 = [];
			var jzmj = resData;
			for (var i = 0; i < resData.length; i++) {
				if (cfang1.indexOf(resData[i].color) === -1) {
					cfang1.push(resData[i].color);
				}
				if (cfang2.indexOf(resData[i].jd) === -1) {
					cfang2.push(resData[i].jd);
				}

				if (resData[i].jingdu) {
					point = new BMap.Point(resData[i].jingdu, resData[i].weidu);
					// console.log(resData[i].jingdu);
					// console.log(resData[i].weidu);
					addMarker01(point, resData[i].id);

					var opts = {
						position: point, // 指定文本标注所在的地理位置
						offset: new BMap.Size(16, -16) // 设置文本偏移量
					};
					// 创建文本标注对象
					var label = new BMap.Label(resData[i].dkmc, opts);
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
					map.addOverlay(label);
				}
				if (resData[i].jwd) {
					var jinweid = resData[i].jwd.split(';');
					// var jinweids = jinweid[0].split(',')

					var pointarr = [];
					var tbcolor = '';
					for (var p = 0; p < jinweid.length; p++) {
						if (jinweid[p]) {
							pointarr.push(new BMap.Point(jinweid[p].split(',')[0], jinweid[p].split(',')[1]))
						}
					}
					if (resData[i].color == '招投标进行中') {
						tbcolor = '#fff819'
					} else if (resData[i].color == '等待招投标') {
						tbcolor = '#ee3c3f'
					} else {
						tbcolor = '#5bba33'
					}
					var polygon = new BMap.Polygon(pointarr, {
						strokeColor: tbcolor,
						strokeWeight: 3,
						strokeOpacity: 0.4,
						fillColor: tbcolor,
						fillOpacity: 0.6

					});
					map.addOverlay(polygon);

				}
			}
			jzmj.sort(function (a, b) {
				return (parseFloat(b.tdmj) - parseFloat(a.tdmj))
			})
			var lyhtmls = '';
			var mylouyu = [];
			var mylouyumj = [];
			for (var k = 0; k < 8; k++) {
				mylouyu.push(jzmj[k].dkmc);
				mylouyumj.push(jzmj[k].tdmj);

				lyhtmls += '<tr>'
				lyhtmls += '<td>' + (k + 1) + '</td>'
				lyhtmls += '<td>' + jzmj[k].dkmc + '</td>'
				lyhtmls += '<td>' + jzmj[k].tdmj + '</td>'
				lyhtmls += '</tr>'
			}
			$('#dikuaicon').append(lyhtmls);
			myChart.setOption({
				series: [{
					data: mylouyumj
				}]
			});

			map.centerAndZoom(new BMap.Point(121.498549, 29.882656), 15);
			//搜索选项
			// var cfhtml = ''
			// for (var j = 0; j < cfang1.length; j ++) {
			// 	cfhtml +='<span data="' + cfang1[j] + '">' + cfang1[j] + '</span>'
			// }
			// $('#dfang1').append(cfhtml);
			// $('#dfang1 span').on('click', function() {
			// 	$(this).addClass('grncli').siblings().removeClass('grncli');
			// 	var numdata = $(this).attr('data');
			// 	$('#dkshaix1').val(numdata)
			// 	$('#searchdk').val('');
			// 	bblist1('', numdata, $('#dkshaix2').val());
			// })

			//坐地主体选项搜索筛选
			var cfhtmls = ''
			for (var j = 0; j < cfang2.length; j++) {
				cfhtmls += '<span data="' + cfang2[j] + '">' + cfang2[j] + '</span>'
			}
			$('#dfang2').append(cfhtmls);

			$('#dfang2 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#dkshaix2').val(numdata)
				$('#searchdk').val('');

				var numsplit = $('#dkshaix1').val().split(',');
				// console.log(numsplit);
				bblist1('', numdata, numsplit[0], numsplit[1]);
			})

			$('#dfang3 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#dkshaix3').val(numdata)
				$('#searchdk').val('');

				var numsplit = $('#dkshaix1').val().split(',');
				// console.log(numsplit);
				bblist1('', $('#dkshaix2').val(), numsplit[0], numsplit[1],numdata);
			})

		}
	});
}

// 高风险点位
function addMarker01(point, itemid) {

	var myIcon = new BMap.Icon("img/new0116/icon-1.png", new BMap.Size(25, 25));

	// if (name == "高") {
	// 	myIcon = new BMap.Icon("img/new0116/icon-01.png", new BMap.Size(25, 25));
	// } else if (name == "中") {
	// 	myIcon = new BMap.Icon("img/new0116/icon-02.png", new BMap.Size(25, 25));
	// } else {
	// 	myIcon = new BMap.Icon("img/new0116/icon-03.png", new BMap.Size(25, 25));
	// }


	// var marker = new BMap.Marker(point, {
	// 	icon: myIcon
	// });

	var marker = new BMap.Marker(point);


	var arraymarker = {};
	arraymarker.itemid = itemid;
	marker.customData = arraymarker;

	map.addOverlay(marker)

	// 点击点位
	marker.addEventListener('mouseover', function (e) {
		// var point_n = new BMap.Point(e.point.lng,e.point.lat);
		var id = e.target.customData.sqid;
		// showTc(id);

	});


	// 鼠标滑动

	marker.addEventListener("click", function (e) {
		// console.log(e.target.customData)
		var point = new BMap.Point(e.point.lng, e.point.lat);
		var itemid = e.target.customData.itemid;

		openwin01(itemid);
		//this.openInfoWindow(infoWindow);


	});
}

function openwin01(id) {
	var opts = {
		width: 320, // 信息窗口宽度
		height: 480, // 信息窗口高度
		// title : "信息窗口" , // 信息窗口标题
		// // enableMessage:true, //设置允许信息窗发送短息
		// message: 'zhe'
	};
	$.ajax({
		url: ajaxUrl + 'system/dk/' + id,
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
				sContent += '<div>' + resdata.dkmc + '</div>'
				sContent += '</div>'
				sContent += '<div class="popupbox">'
				sContent += '<div class="popupbox-wrap popaddimg">'
				if (resdata.photo) {
					sContent += '<img src="' + ajaxImg + resdata.photo.split(',')[0] + '" />'
				} else {
					sContent += '<img src="img/new0116/tudi.jpg" />'
				}
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>①坐地单位：</p><span>' + resdata.jd + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>②宗地位置：</p><span>' + resdata.location + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>③土地面积(公顷)：</p><span>' + ((resdata.tdmj) * 0.07).toFixed(2) + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>④土地面积（亩）：</p><span>' + resdata.tdmj + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>⑤地块情况：</p><span>' + resdata.dkqk + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>⑥地块用途：</p><span>' + resdata.dkyt + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap popfloat">'
				sContent += '<span onclick="boxchuang1(' + id + ')">更多&gt;&gt;</span>'
				sContent += '</div>'
				sContent += '</div>'
				sContent += '</div>'

				var infoWindow = new BMap.InfoWindow(sContent, opts);

				map.openInfoWindow(infoWindow, point);
				// $(function() {
				// 	$('.BMap_top').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_center').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').prev().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').next().children(":first").css('background', 'rgba(14,50,69,0.8)')
				// 	$('.BMap_bottom').next().next().html('')
				// })
			} else {
				boxchuang1(id)
			}

		},
	});

}

function boxchuang1(id) {
	$('#tanchuang').show();

	$.ajax({
		url: ajaxUrl + 'system/dk/' + id,
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res);
			var resdata = res.data;

			$('#dlouyu').html(resdata.dkmc);
			$('#dlouyu1').html(resdata.dkmc);
			$('#dlouyu2').html(resdata.jd);
			$('#dlouyu3').html(resdata.location);
			$('#dlouyu4').html(resdata.tdmj);
			$('#dlouyu5').html(resdata.rjl);
			$('#dlouyu6').html(resdata.jzmd);
			$('#dlouyu7').html(resdata.jzgd);
			$('#dlouyu8').html(resdata.ldl);
			$('#dlouyu9').html(resdata.dkqk);
			$('#dlouyu10').html(resdata.dkyt);
			$('#dlouyu11').html(resdata.color);
			$('#dlouyu12').html(resdata.bz);


			//导出
			const iiii = `<button class="btnexcel" id="exportExcel" name="exportExcel">
			<img src="images/jiadao.png" alt=""><span>导出</span>
		</button>`
			$('#dikuaibutton').append(iiii);

			$('#exportExcel').on('click', function () {

				let nodehtml = '';
				nodehtml += '<tr>'
				nodehtml += '<td>地块名称</td>'
				nodehtml += '<td>' + resdata.dkmc + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>做地主体</td>'
				nodehtml += '<td>' + resdata.jd + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>宗地位置</td>'
				nodehtml += '<td>' + resdata.location + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>土地面积（亩）</td>'
				nodehtml += '<td>' + resdata.tdmj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>容积率</td>'
				nodehtml += '<td>' + resdata.rjl + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>建筑密度（%）</td>'
				nodehtml += '<td>' + resdata.jzmd + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>建筑高度（米）</td>'
				nodehtml += '<td>' + resdata.jzgd + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>绿地率（%）</td>'
				nodehtml += '<td>' + resdata.ldl + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>地块情况</td>'
				nodehtml += '<td>' + resdata.dkqk + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>地块用途</td>'
				nodehtml += '<td>' + resdata.dkyt + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>地块状态</td>'
				nodehtml += '<td>' + resdata.color + '</td>'
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
$('#tc_close').on('click', function () {
	$('#tanchuang').hide()
})