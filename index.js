// let oneActivity = document.getElementById('top-activity-title')
// let oneDesc = document.getElementById('top-activity-description')
// let randomizer = document.getElementById('random')


// randomizer.addEventListener('click', (event) => {
//     event.preventDefault();

//     fetch("https://www.boredapi.com/api/activity")
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function(data) {
//         let dataType;
//         if (data.type === 'diy') {
//             dataType = data.type.toUpperCase();
//         } else if (data.type !== 'diy') {
//             let dataTypeUpper = data.type[0]
//             let dataTypeLower = data.type.slice(1)
//             dataTypeUpper = dataTypeUpper.toUpperCase()
//             dataType = dataTypeUpper + dataTypeLower;
//         }
//         let dataPrice = data.price * 10;
//         oneActivity.innerText = `${data.activity}`;
//         oneDesc.innerHTML = `Type: ${dataType} <br><br> Participants: ${data.participants} <br><br> Price: $${dataPrice}`;
//     })
// })

let oneActivity = document.getElementById('top-activity-title')
let oneDesc = document.getElementById('top-activity-description')
let randomizer = document.getElementById('random')


randomizer.addEventListener('click', (event) => {
    event.preventDefault();

    fetch("https://www.boredapi.com/api/activity")
    .then(function (res) {
        return res.json();
    })
    .then(function(data) {
        let dataType;
        if (data.type === 'diy') {
            dataType = data.type.toUpperCase();
        } else if (data.type !== 'diy') {
            let dataTypeUpper = data.type[0]
            let dataTypeLower = data.type.slice(1)
            dataTypeUpper = dataTypeUpper.toUpperCase()
            dataType = dataTypeUpper + dataTypeLower;
        }
        let dataPrice = data.price * 10;
        oneActivity.innerHTML = `<br>${data.activity}`;
        let oneDesc = document.createElement('p');
        oneDesc.setAttribute('id', 'top-activity-description')
        oneDesc.innerHTML = `Type: ${dataType} <br><br> Participants: ${data.participants} <br><br> Price: $${dataPrice}`;
        oneActivity.appendChild(oneDesc);
    })
})