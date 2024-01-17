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
    "data": staffsArray,
    pagingType: "simple",
    pageLength: 5,
    'columnDefs': [
       {
            'targets': 0,
            'checkboxes': {
                'selectRow': true
            }
       },
    ],
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

var actionBtn = document.getElementById("rows-action")
actionBtn.addEventListener("click", (btn) => {
    console.log("button clicked!")
})

 /* var handleBulkSelect = {
    checkboxes: document.querySelectorAll(".dt-checkboxes"),
    selectedData: table.columns(0).checkboxes.selected().data().toArray(),
    listenStateChange: function(){
        this.checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("click", async() => {
                console.log(this.selectedData)
                document.querySelector(".staff-plus").classList.add("d-none")
                if (this.selectedData.length === 0) {
                    document.querySelector(".staff-plus").classList.remove("d-none")
                }
            })
        })
    }
 } */
