// 企业环评分析
// var myChart02 = echarts.init(document.getElementById("table02"));
option11 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		data: [{
				icon: 'circle',
				name: '未环评'
			},
			{
				icon: 'circle',
				name: '已环评'
			}
		],
		textStyle: {
			color: '#9eb7de',
		},
		borderRadius: 100,
		right: '12%'
	},
	series: [{
		name: '企业环评分析',
		type: 'pie',
		radius: '55%',
		// 0204修改
		center: ['50%', '50%'],
		data: [{
				value: '37',
				name: '已环评',
				itemStyle: {
					color: '#5d7fb5'
				}
			},
			{
				value: '17',
				name: '未环评',
				itemStyle: {
					color: '#ff5454'
				}
			}
		],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		},
		label: {
			position: 'inside',
			normal: {
				position: 'right',
				formatter: '{b|{b}}\n\n{a|({d}%)}\n\n{c|{c}}',
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
