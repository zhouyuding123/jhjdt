var mapse = new BMap.Map("mapse"); // 创建Map实例
mapse.centerAndZoom(new BMap.Point(121.495549, 29.878656), 15); //初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
mapse.addControl(new BMap.MapTypeControl({
	mapTypes: [
		BMAP_NORMAL_MAP,
		// BMAP_HYBRID_MAP,
		BMAP_SATELLITE_MAP
	]
}));
mapse.setMapType(BMAP_SATELLITE_MAP);
mapse.setCurrentCity("宁波海曙区"); // 设置地图显示的城市 此项是必须设置的
mapse.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
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

$('#searchcf').on('input', function () {
	var searchcf = $(this).val();
	if (searchcf == '') {
		$('#cfshaix1').val('')
		$('#cfshaix2').val('')
		$('#cfshaix3').val('')
		$('#cfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#cfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#cfang3 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist3('')
	}
})
$('#seabutcf').on('click', function () {
	var searchcf = $('#searchcf').val()
	if (searchcf) {
		$('#cfshaix1').val('')
		$('#cfshaix2').val('')
		$('#cfshaix3').val('')
		$('#cfang1 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#cfang2 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		$('#cfang3 span:first-child').addClass('grncli').siblings().removeClass('grncli');
		bblist3(searchcf)
	}
})

// bblist3('')
function bblist3(lymc, level, jd, jzmj1, jzmj2) {
	var url = "system/gycf/list";
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
			// console.log(res);
			if (res.code == 401) {
				window.location.replace('login.html');
			}
			if (res.rows[0] && res.total > 0) {
				$('#lypage3').show();
				layui.use('laypage', function () {
					var laypage = layui.laypage;
					laypage.render({
						elem: 'lypage3',
						count: res.total,
						limit: 7,
						groups: 3, //连续页码个数
						prev: '＜＜',
						next: '＞＞',
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
										nodetext += '<li onclick="openwin03(' + item.id + ')">'
										nodetext += '<div class="search_li clearfix">'
										nodetext += '<div class="sear_left">'
										nodetext += '<img src="img/new0116/index-address.png" >'
										nodetext += '<span>' + (index + 1) + '</span>'
										nodetext += '</div>'
										nodetext += '<div class="sear_right">'
										nodetext += '<p>' + item.lymc + '</p>'
										nodetext += '<p>' + item.location + '</p>'
										nodetext += '</div>'
										nodetext += '</div>'
										nodetext += '</li>';
									});
									document.getElementById('seaList3').innerHTML = nodetext;
								}
							});
						}
					});
				})
			} else {
				$('#seaList3').html('');
				$('#lypage3').hide();
			}
		}
	});
};

// dws3()
function dws3() {
	$.ajax({
		url: ajaxUrl + 'system/gycf/list',
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
			for (var i = 0; i < resData.length; i++) {
				if (cfang1.indexOf(resData[i].level) === -1) {
					cfang1.push(resData[i].level);
				}
				if (cfang2.indexOf(resData[i].jd) === -1) {
					cfang2.push(resData[i].jd);
				}
				if (resData[i].jingdu) {
					point = new BMap.Point(resData[i].jingdu, resData[i].weidu);
					addMarker03(point, resData[i].id);

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
					mapse.addOverlay(label);
				}
			}
			mapse.centerAndZoom(new BMap.Point(121.41349, 29.859067), 17);
			//搜索选项
			var cfhtml = ''
			for (var j = 0; j < cfang1.length; j++) {
				cfhtml += '<span data="' + cfang1[j] + '">' + cfang1[j] + '</span>'
			}
			$('#cfang1').append(cfhtml);
			var cfhtmls = ''
			for (var j = 0; j < cfang2.length; j++) {
				cfhtmls += '<span data="' + cfang2[j] + '">' + cfang2[j] + '</span>'
			}
			$('#cfang2').append(cfhtmls);

			//搜索筛选
			$('#cfang1 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#cfshaix1').val(numdata)
				$('#searchcf').val('');
				bblist3('', numdata, $('#cfshaix2').val());
			})
			$('#cfang2 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#cfshaix2').val(numdata)
				$('#searchcf').val('');
				bblist3('', $('#cfshaix1').val(), numdata);
			})
			$('#cfang3 span').on('click', function () {
				$(this).addClass('grncli').siblings().removeClass('grncli');
				var numdata = $(this).attr('data');
				$('#cfshaix3').val(numdata)
				// console.log(numdata);
				$('#searchcf').val('');
				var numsplit = numdata.split(',');
				bblist3('', $('#cfshaix1').val(), $('#cfshaix2').val(), numsplit[0], numsplit[1]);
			})

		}
	});

	// map.centerAndZoom(point, 16);
}

// 高风险点位
function addMarker03(point, itemid) {

	var myIcon = new BMap.Icon("img/new0116/icon-031.png", new BMap.Size(18, 18));

	var marker = new BMap.Marker(point, {
		icon: myIcon
	});

	var arraymarker = {};
	arraymarker.itemid = itemid
	marker.customData = arraymarker;

	mapse.addOverlay(marker)

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

		openwin03(itemid);
		//this.openInfoWindow(infoWindow);

	});
}

function openwin03(id) {

	var opts = {
		width: 320, // 信息窗口宽度
		height: 420, // 信息窗口高度
		// title : "信息窗口" , // 信息窗口标题
		// enableMessage:true, //设置允许信息窗发送短息
		// message: 'zhe'
	};
	$.ajax({
		url: ajaxUrl + 'system/gycf/' + id,
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
					sContent += '<img src="img/new0116/changf.jpg" />'
				}
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>①厂房名称：</p><span>' + resdata.lymc + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>②级别：</p><span>' + resdata.level + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>③乡镇街道：</p><span>' + resdata.jd + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap">'
				sContent += '<p>④建筑面积(㎡)：</p><span>' + resdata.jzmj + '</span>'
				sContent += '</div>'
				sContent += '<div class="popupbox-wrap popfloat">'
				sContent += '<span onclick="boxchuang3(' + id + ')">更多&gt;&gt;</span>'
				sContent += '</div>'
				sContent += '</div>'
				sContent += '</div>'

				var infoWindow = new BMap.InfoWindow(sContent, opts);

				mapse.openInfoWindow(infoWindow, point);
			} else {
				boxchuang3(id)
			}

		},
	});
}

function boxchuang3(id) {
	$('#tanchuang3').show();

	$.ajax({
		url: ajaxUrl + 'system/gycf/' + id,
		data: {},
		type: "get",
		dataType: "JSON",
		headers: {
			'Authorization': localStorage.getItem("token")
		},
		success: function (res) {
			// console.log(res);
			var resdata = res.data;

			$('#clouyu').html(resdata.lymc);
			$('#clouyu1').html(resdata.lymc);
			$('#clouyu2').html(resdata.level);
			$('#clouyu3').html(resdata.jd);
			$('#clouyu4').html(resdata.year);
			$('#clouyu5').html(resdata.location);
			$('#clouyu6').html(resdata.ytsx);
			$('#clouyu7').html(resdata.jzmj);
			$('#clouyu8').html(resdata.symj);
			$('#clouyu9').html(resdata.swmj);
			$('#clouyu10').html(resdata.ysymj);
			$('#clouyu11').html(resdata.kzsswmj);
			$('#clouyu12').html(resdata.kzssymj);
			$('#clouyu13').html(resdata.zlc);
			$('#clouyu14').html(resdata.cg);
			$('#clouyu15').html(resdata.zxcd);
			$('#clouyu16').html(resdata.lxr);
			$('#clouyu17').html(resdata.pjzj);
			$('#clouyu18').html(resdata.wyf);
			$('#clouyu19').html(resdata.tcw);
			$('#clouyu20').html(resdata.jt);
			$('#clouyu21').html(resdata.cqf);
			$('#clouyu22').html(resdata.bz);

			var iiiie = `<button class="btnexceler" id="exportExceler" name="exportExceler">
			<img src="images/jiadao.png" alt=""><span>导出</span>
		</button>`
			$('#dikuaibuttoner').append(iiiie);

			$('#exportExceler').on('click', function () {

				var nodehtml = '';
				nodehtml += '<tr>'
				nodehtml += '<td>厂房名称</td>'
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
				nodehtml += '<td>可招商商业面积(㎡)</td>'
				nodehtml += '<td>' + resdata.kzssymj + '</td>'
				nodehtml += '</tr>'
				nodehtml += '<tr>'
				nodehtml += '<td>总楼层</td>'
				nodehtml += '<td>' + resdata.zlc + '</td>'
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
$('#tc_close3').on('click', function () {
	$('#tanchuang3').hide()
})