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
        document.querySelector(".detail-name").innerText = loggedInStaff.name
        document.querySelector(".detail-ln").innerText = loggedInStaff.lnHandle
        document.querySelector(".detail-x").innerText = loggedInStaff.xHandle
        document.querySelector(".detail-x").setAttribute("href", `https://x.com/${loggedInStaff.xHandle}`)
        document.querySelector(".detail-mail").innerText = loggedInStaff.email

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

        staffArea.registerStaff()
    }
)
fetchAllstaffs().then(
    (response) => {
        staffDtos = response.data.staffs
        staffArea.populateObjects()
        console.log(staffArea.staffObjects)
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
                    }, 3800)
                    document.getElementById("staffModal").querySelector("form").reset()
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
            formData.forEach((value, key) => {
                jsonData[key] = value
            })
            jsonData["id"] = loggedInStaff.id
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