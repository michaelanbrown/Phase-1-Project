let oneActivity = document.getElementById('top-activity-title')
let twoActivity = document.getElementById('two-activity')
let threeActivity = document.getElementById('three-activity')
let fourActivity = document.getElementById('four-activity')
let fiveActivity = document.getElementById('five-activity')
let randomizer = document.getElementById('random')
let subActivities = document.getElementsByClassName('sub-act')

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
                    dataArray = dataArray.map(function(element) {
                        return {activity: element.activity, type: element.type, participants: element.participants, price: element.price*10}
                    })
                    dataArray = dataArray.map(function(element) {
                        let elementType;
                        if (element.type === 'diy') {
                            elementType = element.type.toUpperCase();
                        } else if (element.type !== 'diy') {
                            let elementTypeUpper = element.type[0]
                            elementTypeUpper = elementTypeUpper.toUpperCase();
                            let elementTypeLower = element.type.slice(1);
                            elementType = elementTypeUpper + elementTypeLower
                        }
                        return {activity: element.activity, type: elementType, participants: element.participants, price: element.price}
                    })
                    console.log(dataArray)
                    oneActivity.innerHTML = `<br>${dataArray[0].activity}`;
                    let oneDesc = document.createElement('p');
                    oneDesc.setAttribute('id', 'top-activity-description')
                    oneDesc.innerHTML = `Type: ${dataArray[0].type} <br><br> Participants: ${dataArray[0].participants} <br><br> Price: $${dataArray[0].price}`;
                    oneActivity.appendChild(oneDesc);
                    twoActivity.innerHTML = `<br>${dataArray[1].activity}`;
                    let twoDesc = document.createElement('p');
                    twoDesc.setAttribute('id', 'two-activity-description')
                    twoDesc.innerHTML = `Type: ${dataArray[1].type} <br><br> Participants: ${dataArray[1].participants} <br><br> Price: $${dataArray[1].price}`;
                    twoActivity.appendChild(twoDesc);
                    threeActivity.innerHTML = `<br>${dataArray[2].activity}`;
                    let threeDesc = document.createElement('p');
                    threeDesc.setAttribute('id', 'three-activity-description')
                    threeDesc.innerHTML = `Type: ${dataArray[2].type} <br><br> Participants: ${dataArray[2].participants} <br><br> Price: $${dataArray[2].price}`;
                    threeActivity.appendChild(threeDesc);
                    fourActivity.innerHTML = `<br>${dataArray[3].activity}`;
                    let fourDesc = document.createElement('p');
                    fourDesc.setAttribute('id', 'four-activity-description')
                    fourDesc.innerHTML = `Type: ${dataArray[3].type} <br><br> Participants: ${dataArray[3].participants} <br><br> Price: $${dataArray[3].price}`;
                    fourActivity.appendChild(fourDesc);
                    fiveActivity.innerHTML = `<br>${dataArray[4].activity}`;
                    let fiveDesc = document.createElement('p');
                    fiveDesc.setAttribute('id', 'five-activity-description')
                    fiveDesc.innerHTML = `Type: ${dataArray[4].type} <br><br> Participants: ${dataArray[4].participants} <br><br> Price: $${dataArray[4].price}`;
                    fiveActivity.appendChild(fiveDesc);
                    })    
                })
            }) 
        })   
    })
})