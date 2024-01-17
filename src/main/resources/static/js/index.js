
/* import echarts from 'echarts' */

var projNamesArray = [
    "Other Projects' clients",
    "Urban Oasis Realty", 
    "Haven Homes", "Villagreen Homes", 
    "Downtown Eden", "Cityscape Properties", 
    "Oakwood Real Estate", "Maplewood Realty",
    "Harmony Homes", "Mountain View Realty",
    "Parkside Properties"
]
var projSelectObj = {
    selectElem: document.getElementById("projectsList"),
    projNames: projNamesArray,
    optionsFunc: function(){
        this.projNames.forEach((item)=>{
            var opt = document.createElement("option")
            opt.innerText = item
            this.selectElem.appendChild(opt)
        })
    }
}
document.addEventListener('DOMContentLoaded', function() {
    projSelectObj.optionsFunc()
})

var clientsArray = [
    {
        "id":"1",
        "name":"Panthera Nestah",
        "email":"pantheranestah@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"2",
        "name":"Niesta Charlotte",
        "email":"niestacharlotte@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"3",
        "name":"Gift Nestah",
        "email":"giftnestah@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"4",
        "name":"Ubuntu Nestah",
        "email":"ubuntunestah@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"5",
        "name":"Dave Gray",
        "email":"dgray@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"6",
        "name":"Mosh Hermedani",
        "email":"moshhermedani@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"7",
        "name":"Marlyne Williams",
        "email":"marlynewilliams@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"8",
        "name":"Clare Linton",
        "email":"clarelinton@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"9",
        "name":"Syokau Mbith",
        "email":"syokau01@gmail.com",
        "phone":"+254798765432"
    },
    {
        "id":"10",
        "name":"Candy Synclare",
        "email":"candy02@gmail.com",
        "phone":"+254798765432"
    }
]
var projsArray = [
    {
        "id": "1",
        "name": "Urban Oasis Realty",
        "value": "30.1M",
        "clients": "15"
    },
    {
        "id": "2",
        "name": "Haven Homes",
        "value": "22.1M",
        "clients": "23"
    },
    {
        "id": "3",
        "name": "Villagreen Homes",
        "value": "24M",
        "clients": "11"
    },
    {
        "id": "4",
        "name": "Downtown Eden",
        "value": "18M",
        "clients": "27"
    },
    {
        "id": "5",
        "name": "Cityscape Properties",
        "value": "44M",
        "clients": "19"
    },
    {
        "id": "6",
        "name": "Oakwood Real Estate",
        "value": "47M",
        "clients": "13"
    },
    {
        "id": "7",
        "name": "Maplewood Realty",
        "value": "22M",
        "clients": "14"
    },
    {
        "id": "8",
        "name": "Harmony Homes",
        "value": "19M",
        "clients": "27"
    },
    {
        "id": "9",
        "name": "Mountain View Realty",
        "value": "27M",
        "clients": "17"
    },
    {
        "id": "10",
        "name": "Parkside Properties",
        "value": "17M",
        "clients": "21"
    }
]

$(document).ready(() => {
    $("#clientsTable").DataTable(
        {
            select: {
                style: "multi",
                selector: 'td:first-child input:checkbox',
                selectAll: true
            },
            pagingType: "simple",
            pageLength: 8,
            data: clientsArray,
            columns: [
                {data: "id"},
                {data: "name"},
                {data: "email"},
                {data: "phone"}
            ]
        }
    )
    $("#projTable").DataTable(
        {
            select: {
                style: "multi",
                selector: 'td:first-child input:checkbox',
                selectAll: true
            },
            pagingType: "simple",
            pageLength: 8,
            data: projsArray,
            columns: [
                {data: "id"},
                {data: "name"},
                {data: "value"},
                {data: "clients"}
            ]
        }
    )
})
var clientsGraph = echarts.init(document.getElementById("clientsGraph"))
var propGraph = echarts.init(document.getElementById("propGraph"))

var gradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(29,140,248,0.5)' },   // Start color
    { offset: 1, color: 'rgba(29,140,248,0)' }      // End color
], false)

var clientGraphOption = {
    grid: {
        top: "20%",
        bottom: "20%",
        left: "10%",
        right: "10%"
    },
    xAxis: {
        data: ["Jan","Apr","Aug","Dec"],
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false,
        },
        axisTick: {
            show: false,
        }
    },
   tooltip: {
    trigger: "axis"
   },
    yAxis: [
        {
            type: "value",
            min: 15,
            max: 80,
            position: "rignt",
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                show: false,
            },
        },
        {
            splitLine: {},
        }
    ],
    series: [
        {
            name: "Clients",
            yAxisIndex: 0,
            data: [20,47,63,79],
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
            },
            areaStyle: {
                color: gradientColor
            }
        }
    ],
    animation: true,
    animationEasing: "quadraticInOut",
}

var propGraphOption = {
	title: {
        show: true,
		text: "40+",
		left: "center",
		top: "center",
        fontSize: "30"
	},
	tooltip: {},
	legend: {
        show: false,
        type: "scroll",
        orient: "vertical",
        left: 0,
        bottom: 0,
		data: ["Sold","Leased","Unfinished","Free"]
	},
	series: [
		{
			type: "pie",
			data: [
				{
					value: 17,
					name: "Sold"
				},
				{
					value: 23,
					name: "Leased"
				},
				{
					value: 15,
					name: "Unfinished"
				},
				{
					value: 17,
					name: "Free"
				}
			],
			radius: ["50%", "55%"],
			avoidLabelOverlap: false,
			label: {
				show: false,
			},
			labelLine: {
				show: false
			},
			emphasis: {
				label: {
					show: false,
					fontSize: "8",
					fontWeight: "bold"
				}
			}
		}
	]	
}
clientsGraph.setOption(clientGraphOption)
propGraph.setOption(propGraphOption)
