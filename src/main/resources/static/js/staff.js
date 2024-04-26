var staffsArray = [
    {
        "id": 1,
        "name":"William Tony",
        "department":"HR",
        "phone":"+254798765432",
        "email":"tonywilliam@gmail.com"
    },
    {
        "id": 2,
        "name":"Alfred Juma",
        "department":"Sales",
        "phone":"+254798765432",
        "email":"alfredjuma@gmail.com"
    },
    {
        "id": 3,
        "name":"Gabriel Wekesa",
        "department":"Support",
        "phone":"+254798765432",
        "email":"gabrielwekesa@gmail.com"
    },
    {
        "id": 4,
        "name":"Lyne Wanjiku",
        "department":"Accounts",
        "phone":"+254798765432",
        "email":"lynewanjiku@gmail.com"
    },
    {
        "id": 5,
        "name":"Candy Synclare",
        "department":"HR",
        "phone":"+254798765432",
        "email":"candysynclare@gmail.com"
    }
]
var table = $('#staff-table').DataTable({
    "data": [],
    pagingType: "simple",
    pageLength: 5,
    /* 'columnDefs': [
       {
            'targets': 0,
            'checkboxes': {
                'selectRow': true
            }
       },
    ], */
    "columns": [
        {"data": "id"},
        {"data": "name"},
        {"data": "department"},
        {"data": "phone"},
        {"data": "email"}
    ],
    'select': {
       'style': 'multi',
       "selector": 'td:first-child'
    },
    'order': [[1, 'asc']],
 })

const apiEndPoint = "http://localhost:8080/api/"

var staffDtos = []
var loggedInStaff

var fetchAllstaffs = async() => {
    var staffPromise = await fetch(
        `${apiEndPoint}staffs/all`,
        {
            method: "GET"
        }
    )
    const respBody = await staffPromise.json()
    return (respBody)
}
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
        document.querySelector(".detail-name").innerText = loggedInStaff.name
        document.querySelector(".detail-dept").innerText = loggedInStaff.department
        document.querySelector(".detail-ln").innerText = loggedInStaff.lnHandle
        document.querySelector(".detail-x").innerText = loggedInStaff.xhandle
        document.querySelector(".detail-x").setAttribute("href", `https://x.com/${loggedInStaff.xHandle}`)
        document.querySelector(".detail-mail").innerText = loggedInStaff.email

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

        staffArea.registerStaff()
        staffArea.editStaff()
        staffArea.profUpload()

        homeOps.registerProject()
        homeOps.registerClient()
    }
)
fetchAllstaffs().then(
    (response) => {
        staffDtos = response.data.staffs
        staffArea.populateObjects()
        /* console.log(staffArea.staffObjects) */
        table.clear().rows.add(staffArea.staffObjects).draw()
    }
)
var homeOps = {
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
var staffArea = {
    staffDtos: [],
    staffObjects: [],
    populateObjects: function() {
        for (let i = 0;i < staffDtos.length;i++){
            var obj = {
                "id": staffDtos[i].id,
                "name": staffDtos[i].name,
                "email": staffDtos[i].email,
                "phone": staffDtos[i].phone,
                "department": staffDtos[i].department,
                "lnHandle": staffDtos[i].lnHandle,
                "xHandle": staffDtos[i].xHandle
            }
            this.staffObjects.push(obj)
        }
    },
    registerStaff: function() {
        document.getElementById("staffForm").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            /* const today = new Date()
            var regDate = today.toISOString().slice(0, 10)
            jsonData["registrationDate"] = regDate */
            fetch(
                `${apiEndPoint}staffs/new`,
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
                    document.getElementById("staffModal").querySelector(".success").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("staffModal").querySelector(".success").classList.replace("d-flex", "d-none")
                        document.getElementById("staffModal").querySelector("form").reset()
                    }, 3800)
                }
                else
                {
                    document.getElementById("staffModal").querySelector(".failure").classList.replace("d-none", "d-flex")
                    setTimeout(() => {
                        document.getElementById("staffModal").querySelector(".failure").classList.replace("d-flex", "d-none")
                    }, 3800)
                }
            })
        })
    },
    editStaff: function() {
        document.getElementById("edit-staffForm").addEventListener("submit", (form) => {
            form.preventDefault()
            const formData = new FormData(form.target)
            const jsonData = {}
            jsonData["id"] = loggedInStaff.id
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
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