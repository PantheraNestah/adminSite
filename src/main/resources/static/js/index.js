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
        document.querySelectorAll(".staff-prof-photo").forEach((elem) => {
            elem.setAttribute("src", `/files/staffs/photo?filename=${loggedInStaff.photo}`)
        })
        /* console.log(loggedInStaff) */
        document.getElementById("settingsOffcanvas").querySelector("#staffEmail").value = loggedInStaff.email
        document.getElementById("settingsOffcanvas").querySelector("#staffPhone").value = loggedInStaff.phone
        document.getElementById("settingsOffcanvas").querySelector("#lnHandle").value = (loggedInStaff.lnHandle == null) ? "N/A" : loggedInStaff.lnHandle
        document.getElementById("settingsOffcanvas").querySelector("#xHandle").value = (loggedInStaff.xhandle == null) ? "N/A" : loggedInStaff.xhandle

        document.getElementById("toggle-edit").addEventListener("click", () => {
            document.getElementById("settingsOffcanvas").querySelector(".submit-edit").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#staffEmail").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#staffPhone").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#lnHandle").disabled = false
            document.getElementById("settingsOffcanvas").querySelector("#xHandle").disabled = false
        })
        staffOps.editStaff()
        staffOps.profUpload()
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
        clientsArea.registerClient()
        clientsArea.emailClients()
        clientsArea.smsClients()

        projectsArea.registerProject()
        projectsArea.updateProject()
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
    },
    profUpload: function() {
        document.getElementById("prof-img-upload-form").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData()
            var inputField = document.getElementById("img-upload")
            var file = inputField.files[0]
            formData.append("file", file)
            formData.append("id", loggedInStaff.id)
            console.log(formData)
            fetch(
                `${apiEndPoint}staffs/photo`,
                {
                    method: "POST",
                    body: formData
                }
            ).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
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
                "photo": (projDtos[i].photo == null) ? "N/A" : projDtos[i].photo
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
            if(jsonData.prodValue.endsWith("M"))
            {
                var val = jsonData.prodValue.slice(0, -1)
                jsonData["prodValue"] = val * 1000000
            }
            var fileField = document.getElementById("prodPhoto")
            var projectName = jsonData.prodName
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
                    this.sendFiles(fileField, "projects/new/photo", projectName)
                    document.getElementById("prodModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("prodModal").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.getElementById("prodModal").querySelector("form").reset()
                    }, 3800)
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
    },
    updateProject: function() {
        document.getElementById("searchProdId").addEventListener("click", () => {
            var id = document.getElementById("prodIdEdit").value
            var project = this.projObjects.find((obj) => obj.id == id)

            document.getElementById("prodNameEdit").disabled = false
            document.getElementById("prodValueEdit").disabled = false
            document.getElementById("prodPhotoEdit").disabled = false

            document.getElementById("prodNameEdit").value = project.name
            document.getElementById("prodValueEdit").value = project.value
            document.getElementById("clientsEdit").value = project.clients
            document.getElementById("prodPhotoEdit").value = ""
        })
        document.getElementById("prodFormEdit").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            if(jsonData.prodValue.endsWith("M"))
            {
                var val = jsonData.prodValue.slice(0, -1)
                jsonData["prodValue"] = val * 1000000
            }
            /* console.log(jsonData) */
            var fileField = document.getElementById("prodPhotoEdit")
            fetch(
                `${apiEndPoint}projects/update`,
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
                    this.sendFiles(fileField, "projects/photo", jsonData.id)
                    document.getElementById("prodModalEdit").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("prodModalEdit").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.getElementById("prodModalEdit").querySelector("form").reset()
                    }, 3800)
                }
                else
                {
                    document.getElementById("prodModalEdit").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("prodModalEdit").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
        })
    },
    sendFiles: function(inputField, endPoint, ownerId) {
        var file = inputField.files[0]
        const formData = new FormData()
        formData.append("file", file)
        if(ownerId != null)
        {formData.append("id", ownerId)}
        fetch(
            `${apiEndPoint}${endPoint}`,
            {
                method: "POST",
                body: formData
            }
        ).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
        })
    }
}

var clientsArea = {
    clientDtos: [],
    clientObjects: [],
    selectElem: document.getElementById("projectsList"),
    selectOpts: function() {
        document.querySelector(".clients-prop-label").innerText = projectsArea.projectsNamesArray[0] + " Clients"
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
            document.querySelector(".clients-prop-label").innerText = projDtos[idx].prodName + " Clients"
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
                        document.getElementById("clientModal").querySelector("form").reset()
                    }, 3800)
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
            var date = today.toISOString().slice(0, 10)
            jsonData["date"] = date
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
            var date = today.toISOString().slice(0, 10)
            jsonData["date"] = date

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
