let oneActivity = document.getElementById('top-activity-title')
let randomizer = document.getElementById('random')
let subActivities = document.getElementsByClassName('sub-act')

//     randomizer.addEventListener('click', (event) => {
//         event.preventDefault();
    
//         fetch("https://www.boredapi.com/api/activity")
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function(data) {
//             let dataType;
//             if (data.type === 'diy') {
//                 dataType = data.type.toUpperCase();
//             } else if (data.type !== 'diy') {
//                 let dataTypeUpper = data.type[0]
//                 let dataTypeLower = data.type.slice(1)
//                 dataTypeUpper = dataTypeUpper.toUpperCase()
//                 dataType = dataTypeUpper + dataTypeLower;
//             }
//             let dataPrice = data.price * 10;
//             oneActivity.innerHTML = `<br>${data.activity}`;
//             let oneDesc = document.createElement('p');
//             oneDesc.setAttribute('id', 'top-activity-description')
//             oneDesc.innerHTML = `Type: ${dataType} <br><br> Participants: ${data.participants} <br><br> Price: $${dataPrice}`;
//             oneActivity.appendChild(oneDesc);
//         })
//     })

randomizer.addEventListener('click', (event) => {
    let dataArray = [];
    fetch("https://www.boredapi.com/api/activity")
.then(function (res) {
    return res.json();
})
.then(function(data) {
    dataArray.push(data)
})
.then(function(data) {
    fetch("https://www.boredapi.com/api/activity")
    .then(function (res) {
        return res.json();
    })
    .then(function(data) {
        dataArray.push(data)
    })
    .then(function(data) {
        fetch("https://www.boredapi.com/api/activity")
        .then(function (res) {
        return res.json();
    })
    .then(function(data) {
        dataArray.push(data)
        })
        .then(function(data) {
            fetch("https://www.boredapi.com/api/activity")
            .then(function (res) {
            return res.json();
            })
            .then(function(data) {
            dataArray.push(data)
            }) 
            .then(function(data) {
                fetch("https://www.boredapi.com/api/activity")
                .then(function (res) {
                return res.json();
                })
                .then(function(data) {
                dataArray.push(data)
                    }) 
                .then(function(data) {
                    oneActivity.innerHTML = `<br>${dataArray[0].activity}`;
                    let oneDesc = document.createElement('p');
                    oneDesc.setAttribute('id', 'top-activity-description')
                    oneDesc.innerHTML = `Type: ${dataArray[0].type} <br><br> Participants: ${dataArray[0].participants} <br><br> Price: $${dataArray[0].price}`;
                    oneActivity.appendChild(oneDesc);
                    })    
                })
            }) 
        })   
    })
})