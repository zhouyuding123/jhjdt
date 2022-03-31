$('#lyboxclick').on('click', function() {
	var lybankuai = $('#lybankuai')
	if (lybankuai.html() == '隐藏版块') {
		lybankuai.html('显示版块').siblings().addClass('lytran');
		$('#content1').css('right', '-420px')
	}else {
		lybankuai.html('隐藏版块').siblings().removeClass('lytran');
		$('#content1').css('right', '10px')
	}
})
$('#lyboxclick2').on('click', function() {
	var lybankuai = $('#lybankuai2')
	if (lybankuai.html() == '隐藏版块') {
		lybankuai.html('显示版块').siblings().addClass('lytran');
		$('#content2').css('right', '-420px')
	}else {
		lybankuai.html('隐藏版块').siblings().removeClass('lytran');
		$('#content2').css('right', '10px')
	}
})
$('#quanpin').on('click', function() {
	if ($(this).html() == '全屏') {
		$(this).html('退出');
		$('#content1').addClass('activeNone');
		$('#content2').addClass('activeNone');
		$('#lyboxclick').addClass('activeNone');
		$('#lyboxclick2').addClass('activeNone');
		$('#dsearch1').addClass('activeNone');
		$('#dsearch2').addClass('activeNone');
		$('#dsearch3').addClass('activeNone');
	}else {
		$(this).html('全屏');
		$('#content1').removeClass('activeNone');
		$('#content2').removeClass('activeNone');
		$('#lyboxclick').removeClass('activeNone');
		$('#lyboxclick2').removeClass('activeNone');
		$('#dsearch1').removeClass('activeNone');
		$('#dsearch2').removeClass('activeNone');
		$('#dsearch3').removeClass('activeNone');
	}
})

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
// oPopup()

function listmap(index) {
	var aAres = aArrs[index];
	var point = new BMap.Point(aAres.lng, aAres.lat);
	openwin01(point, aAres, index)
}

var aArrs = [
	{
		name: '区旧改中心',
		dikuai: '望春HS02-03-05地块（新星蔡江河）',
		location: '东至江星路，南至蔡江河，西至双杨河，北至新星路',
		area_gq: '0.92',
		area_m: '13.80',
		condition: '农转用、征地已完成，空闲地',
		purpose: '商服用地',
		lng: '121.522333',
		lat: '29.900571',
		fxcd: '低',
		id: '3'
	},
	{
		name: '区旧改中心',
		dikuai: '姚丰HS14-01-3e地块（桥弄新村西侧）',
		location: '东至福德路，南、西、北至河流',
		area_gq: '0.71',
		area_m: '10.65',
		condition: '农转用、征地已完成，现状有临时工棚',
		purpose: '商服用地',
		lng: '121.513147',
		lat: '29.884638',
		fxcd: '低',
		id: '5'
	},
	{
		name: '区土地储备中心',
		dikuai: '镇明路与解放南路交叉口东北侧地块',
		location: '西至解放南路，南到月湖人家，东、北为公交镇明路首末站',
		area_gq: '1.33',
		area_m: '19.91',
		condition: '目前空置，等市里规划确定后再落实，计划下半年推出。',
		purpose: '公交首末站',
		lng: '121.553834',
		lat: '29.868374',
		fxcd: '低',
		id: '12'
	},
	{
		name: '区开投公司',
		dikuai: '海曙HS16-01-32(汽车南站南侧)',
		location: '东、北至汽车南站，南至祖关山路，西至苍松路',
		area_gq: '0.43',
		area_m: '6.45',
		condition: '已征收，空闲地',
		purpose: '商服用地',
		lng: '121.539303',
		lat: '29.867709',
		fxcd: '低',
		id: '18'
	},
	{
		name: '集士港镇',
		dikuai: '集士港CX08-05-01g地块',
		location: '东至广蔺路，南至前塘河，西至纵五河，北童云林西路',
		area_gq: '4.12',
		area_m: '61.80',
		condition: '待上区委财经会议(金鸡强磁)',
		purpose: '工业用地',
		lng: '121.434944',
		lat: '29.85489',
		fxcd: '低',
		id: '28'
		
	},
	{
		name: '望春管委会',
		dikuai: 'WCH-01-a5地块（奥特莱斯南侧）',
		location: '东至秋实路，南至布政西路，西至河流，北至奥特莱斯',
		area_gq: '2.37',
		area_m: '35.55',
		condition: '集体土地已农转用，国有河流未农转用，明年可出让',
		purpose: '商服用地',
		lng: '121.456433',
		lat: '29.86111',
		fxcd: '低',
		id: '29'
	},
	{
		name: '望春管委会',
		dikuai: 'WCH-06-m2地块',
		location: '东至丰泰路，南至科盛路，西至丰成路，北至科泰',
		area_gq: '2.44',
		area_m: '36.60',
		condition: '农转用、征地已完成，空闲地，预计明年上半年可出让',
		purpose: '工业用地',
		lng: '121.464857',
		lat: '29.857573',
		fxcd: '低',
		id: '31'
	},
	{
		name: '望春管委会',
		dikuai: 'WCH-06-m3地块',
		location: '东至聚才路，南至科盛路，西至丰泰路，北至科泰路',
		area_gq: '2.65',
		area_m: '39.75',
		condition: '农转用、征地已完成，空闲地，预计明年上半年可出让',
		purpose: '工业用地',
		lng: '121.470786',
		lat: '29.85627',
		fxcd: '低',
		id: '32'
	}
];


// var aArrs2 = [
// 	{
// 		name: '中国人寿大厦',
// 		street: '江厦',
// 		location: '灵桥路777号',
// 		floor: '23',
// 		z_area: '39000',
// 		k_area: '5408.75',
// 		lng: '121.563794',
// 		lat: '29.87245',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '中宁大厦',
// 		street: '江厦',
// 		location: '灵桥路255号',
// 		floor: '24',
// 		z_area: '29516',
// 		k_area: '1200',
// 		lng: '121.558314',
// 		lat: '29.866233',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '华联大厦',
// 		street: '江厦',
// 		location: '东渡路55号',
// 		floor: '26',
// 		z_area: '86000',
// 		k_area: '460',
// 		lng: '121.564443',
// 		lat: '29.876548',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '世贸中心',
// 		street: '江厦',
// 		location: '东渡路29号',
// 		floor: '18',
// 		z_area: '68000',
// 		k_area: '3251.4',
// 		lng: '121.564399',
// 		lat: '29.874833',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '天封大厦',
// 		street: '江厦',
// 		location: '灵桥路513号',
// 		floor: '15',
// 		z_area: '10538',
// 		k_area: '0',
// 		lng: '121.56134',
// 		lat: '29.869231',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '建筑大厦',
// 		street: '江厦',
// 		location: '解放南路202号',
// 		floor: '17',
// 		z_area: '24000',
// 		k_area: '375',
// 		lng: '121.555277',
// 		lat: '29.875999',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '世纪广场',
// 		street: '江厦',
// 		location: '华楼街8号',
// 		floor: '27',
// 		z_area: '62000',
// 		k_area: '1380',
// 		lng: '121.555445',
// 		lat: '29.87804',
// 		fxcd: '低',
// 		id: '3'
// 	},
// 	{
// 		name: '环球中心',
// 		street: '江厦',
// 		location: '药行街48号B座',
// 		floor: '25',
// 		z_area: '20164',
// 		k_area: '1100',
// 		lng: '121.563264',
// 		lat: '29.874345',
// 		fxcd: '低',
// 		id: '3'
// 	},
	
// ];

//搜索筛选
// $('#filtrate2 span').on('click', function() {
// 	$('#filtrate3 span:first-child').addClass('grncli').siblings().removeClass('grncli');
// 	$(this).addClass('grncli').siblings().removeClass('grncli');
// 	var numdata = $(this).attr('data');
// 	var numdata1 = numdata.split(',')[0];
// 	var numdata2 = numdata.split(',')[1];
// 	var nodetext = '';
// 	var count = 0;
// 	for (var i = 0; i < aArrs2.length; i++) {
// 		var nums = Number(aArrs2[i].z_area);
// 		if (nums >= numdata1 && nums <= numdata2) {
// 			count += 1;
// 			nodetext +=	'<li onclick="listmap2(' + i + ')">'
// 			nodetext +=		'<div class="search_li clearfix">'
// 			nodetext +=			'<div class="sear_left">'
// 			nodetext +=				'<img src="img/new0116/index-address.png" >'
// 			nodetext +=				'<span>' + count + '</span>'
// 			nodetext +=			'</div>'
// 			nodetext +=			'<div class="sear_right">'
// 			nodetext +=				'<p>' + aArrs2[i].name + '</p>'
// 			nodetext +=				'<p>' + aArrs2[i].location + '</p>'
// 			nodetext +=			'</div>'
// 			nodetext +=		'</div>'
// 			nodetext +=	'</li>';
// 		}
// 	}
// 	$('#seaList2').html(nodetext);
// })


// var polygon2 = new BMap.Polygon([
// 	new BMap.Point(121.51219,29.884481),
// 	new BMap.Point(121.51228,29.884367),
// 	new BMap.Point(121.512334,29.88418),
// 	new BMap.Point(121.513601,29.884043),
// 	new BMap.Point(121.514252,29.886634)
// ], {
// 	strokeColor: '#5bba33',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#5bba33',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon2);


// var polygon3 = new BMap.Polygon([
// 	new BMap.Point(121.553529,29.868209),
// 	new BMap.Point(121.55405,29.868072),
// 	new BMap.Point(121.553996,29.868726),
// 	new BMap.Point(121.553907,29.868804)
// ], {
// 	strokeColor: '#ee3c3f',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#ee3c3f',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon3);


// var polygon4 = new BMap.Polygon([
// 	new BMap.Point(121.538849,29.867768),
// 	new BMap.Point(121.539074,29.868112),
// 	new BMap.Point(121.539775,29.867689),
// 	new BMap.Point(121.539308,29.867278)
// ], {
// 	strokeColor: '#ee3c3f',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#ee3c3f',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon4);


// var polygon5 = new BMap.Polygon([
// 	new BMap.Point(121.433156,29.854875),
// 	new BMap.Point(121.436265,29.853646),
// 	new BMap.Point(121.43688,29.855231),
// 	new BMap.Point(121.43352,29.85574)
// ], {
// 	strokeColor: '#ee3c3f',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#ee3c3f',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon5);


// var polygon6 = new BMap.Polygon([
// 	new BMap.Point(121.455368,29.860112),
// 	new BMap.Point(121.457151,29.860198),
// 	new BMap.Point(121.457547,29.861815),
// 	new BMap.Point(121.455579,29.861709)
// ], {
// 	strokeColor: '#fff819',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#fff819',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon6);


// var polygon7 = new BMap.Polygon([
// 	new BMap.Point(121.464135,29.856919),
// 	new BMap.Point(121.465347,29.856735),
// 	new BMap.Point(121.465612,29.858293),
// 	new BMap.Point(121.464494,29.85843)
// ], {
// 	strokeColor: '#ee3c3f',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#ee3c3f',
// 	fillOpacity: 0.6
// });
// map.addOverlay(polygon7);


// var polygon8 = new BMap.Polygon([
// 	new BMap.Point(121.469839,29.855647),
// 	new BMap.Point(121.471303,29.855251),
// 	new BMap.Point(121.472071,29.85699),
// 	new BMap.Point(121.470261,29.857279)
// ], {
// 	strokeColor: '#fff819',
// 	strokeWeight: 3,
// 	strokeOpacity: 0.4,
// 	fillColor: '#fff819',
// 	fillOpacity: 0.6
	
// });
// map.addOverlay(polygon8);