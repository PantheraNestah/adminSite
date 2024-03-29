const apiEndPoint = "http://localhost:8080/api/"

var projDtos = []
var clientDtos = []
var projectsNames = []
var loggedInStaff
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

var fetchLoggedInStaff = async() => {
    var cstaffPromise = await fetch(
        "http://localhost:8080/meladen/staffs/current",
        {
            method: "GET"
        }
    )
    const respBody = await cstaffPromise.json()
    return (respBody)
}
fetchLoggedInStaff().then(
    (response) => {
        loggedInStaff = response.data.staffDto
        console.log(loggedInStaff)
        document.getElementById("settingsOffcanvas").querySelector("#staffEmail").value = loggedInStaff.email
        document.getElementById("settingsOffcanvas").querySelector("#staffPhone").value = loggedInStaff.phone
        document.getElementById("settingsOffcanvas").querySelector("#lnHandle").value = (loggedInStaff.lnHandle == null) ? "N/A" : loggedInStaff.lnHandle
        document.getElementById("settingsOffcanvas").querySelector("#xHandle").value = (loggedInStaff.xHandle == null) ? "N/A" : loggedInStaff.xHandle

        document.getElementById("toggle-edit").addEventListener("click", () => {
            document.getElementById("settingsOffcanvas").querySelector(".submit-edit").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#staffEmail").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#staffPhone").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#lnHandle").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#xHandle").disabled = false
        })
        staffOps.editStaff()
    }
)
var fetchAllProjs = async() => {
    var projPromise = await fetch(
        `${apiEndPoint}projects/all`,
        {
            method: "GET"
        }
    )
    const respBody = await projPromise.json()
    return (respBody)
}

fetchAllProjs().then(
    (response) => {
        projDtos = response.data.projects
        projectsArea.populateObjects()
        var projectsDataTable = $("#projTable").DataTable(
            {
                select: {
                    style: "multi",
                    selector: 'td:first-child input:checkbox',
                    selectAll: true
                },
                pagingType: "simple",
                pageLength: 8,
                data: projectsArea.projObjects,
                columns: [
                    {data: "id"},
                    {data: "name"},
                    {data: "value"},
                    {data: "clients"}
                ]
            }
        )
        var clientsDataTable = $("#clientsTable").DataTable(
            {
                select: {
                    style: "multi",
                    selector: 'td:first-child input:checkbox',
                    selectAll: true
                },
                pagingType: "simple",
                pageLength: 8,
                data: projDtos[0].clientDtos,
                columns: [
                    {data: "id"},
                    {data: "name"},
                    {data: "email"},
                    {data: "phone"}
                ]
            }
        )
        clientsArea.selectOpts()
        clientsArea.updateTableOnSelect(clientsDataTable)
        projectsArea.registerProject()
        clientsArea.registerClient()
        clientsArea.emailClients()
        clientsArea.smsClients()
    }
)

var staffOps = {
    editStaff: function() {
        document.getElementById("edit-staffForm").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            jsonData["id"] = loggedInStaff.id
            console.log(jsonData)
            /* const today = new Date()
            var regDate = today.toISOString().slice(0, 10)
            jsonData["registrationDate"] = regDate */
            fetch(
                `${apiEndPoint}staffs/edit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.statusCode === 201)
                {
                    console.log("Details editted successfully")
                    document.getElementById("settingsOffcanvas").querySelector(".submit-edit").disabled = true
                    document.getElementById("settingsOffcanvas").querySelector("#staffEmail").disabled = true
                    document.getElementById("settingsOffcanvas").querySelector("#staffPhone").disabled = true
                    document.getElementById("settingsOffcanvas").querySelector("#lnHandle").disabled = true
                    document.getElementById("settingsOffcanvas").querySelector("#xHandle").disabled = true
                }
                else
                {
                   console.log("Details editting unsuccessful")
                }
            })
        })
    }
}

var projectsArea = {
    projDtos: projDtos,
    projObjects: [],
    projectsNamesArray: [],
    populateObjects: function() {
        for (let i = 0;i < projDtos.length;i++){
            this.projectsNamesArray.push(projDtos[i].prodName)
            var obj = {
                "id": projDtos[i].id,
                "name": projDtos[i].prodName,
                "value": `${projDtos[i].prodValue / 1000000}M`,
                "clients": projDtos[i].clientDtos.length,
            }
            this.projObjects.push(obj)
        }
    },
    registerProject: function() {
        document.getElementById("prodForm").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            const today = new Date()
            var regDate = today.toISOString().slice(0, 10)
            jsonData["creationDate"] = regDate
            fetch(
                `${apiEndPoint}projects/new`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.statusCode === 201)
                {
                    document.getElementById("prodModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("prodModal").querySelector(".success").classList.replace("d-flex", "d-none")
                    }, 3800)
                    document.getElementById("prodModal").querySelector("form").reset()
                }
                else
                {
                    document.getElementById("prodModal").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("prodModal").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
        })
    }
}

var clientsArea = {
    clientDtos: [],
    clientObjects: [],
    selectElem: document.getElementById("projectsList"),
    selectOpts: function() {
        for (let i = 0;i < projectsArea.projectsNamesArray.length;i++){
            var opt = document.createElement("option")
            opt.innerText = projectsArea.projectsNamesArray[i]
            opt.setAttribute("value", `${i}`)
            this.selectElem.appendChild(opt)
        }
    },
    updateTableOnSelect: function(table) {
        this.selectElem.addEventListener("change", (event) => {
            var idx = event.target.value
            console.log(`Array of index ${idx} to be used`)
            table.clear().rows.add(projDtos[idx].clientDtos).draw()
        })
    },
    registerClient: function() {
        document.getElementById("clientForm").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            const today = new Date()
            var regDate = today.toISOString().slice(0, 10)
            jsonData["registrationDate"] = regDate
            fetch(
                `${apiEndPoint}clients/new`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.statusCode === 201)
                {
                    document.querySelector(".confirm-product").classList.remove("d-none")
                    document.getElementById("clientModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("clientModal").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.querySelector(".confirm-product").classList.add("d-none")
                    }, 3800)
                    document.getElementById("clientModal").querySelector("form").reset()
                }
                else
                {
                    document.getElementById("clientModal").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("clientModal").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
        })
    },
    smsClients: function() {
        document.getElementById("smsModal").querySelector("form").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            jsonData["subject"] = "Project updates"
            var selectedProd = projDtos.find(obj => obj.id == jsonData.prodId)
            jsonData["clients"] = selectedProd.clientDtos
            const today = new Date()
            var regDate = today.toISOString().slice(0, 10)
            fetch(
                `${apiEndPoint}clients/sms`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.statusCode === 201)
                {
                    document.getElementById("smsModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("smsModal").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.getElementById("smsModal").querySelector("form").reset()
                    }, 3800)
                }
                else
                {
                    document.getElementById("smsModal").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("smsModal").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
            //update activities log
        })
    },
    emailClients: function() {
        document.getElementById("activities-log")
        document.getElementById("emailModal").querySelector("form").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            jsonData["subject"] = "Project updates"
            var selectedProd = projDtos.find(obj => obj.id == jsonData.prodId)
            jsonData["clients"] = selectedProd.clientDtos
            const today = new Date()
            var regDate = today.toISOString().slice(0, 10)

            fetch(
                `${apiEndPoint}clients/email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonData)
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.statusCode === 201)
                {
                    document.getElementById("emailModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("emailModal").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.querySelector(".confirm-product").classList.add("d-none")
                        document.getElementById("emailModal").querySelector("form").reset()
                    }, 3800)
                }
                else
                {
                    document.getElementById("emailModal").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("emailModal").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
            //update activities log
        })
    }
}

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
    //projSelectObj.optionsFunc()
})


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
