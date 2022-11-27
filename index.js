let oneActivity = document.getElementById('top-activity-title')
let twoActivity = document.getElementById('two-activity')
let threeActivity = document.getElementById('three-activity')
let fourActivity = document.getElementById('four-activity')
let fiveActivity = document.getElementById('five-activity')
let randomizer = document.getElementById('random')
let subActivities = document.getElementsByClassName('sub-act')
let submitButton = document.getElementById('form')
let submittedCommentHeader = document.getElementById('comment-header')
let commentFilter = document.getElementById('filter')
let completeCheckbox = document.getElementById('checkbox')
let activities = document.getElementById('activities')
let interactionBar = document.getElementById('interaction')

randomizer.addEventListener('click', (event) => {
    event.preventDefault();
    let dataArray = [];
    //fetch the data 5 times and push to an array
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
                    //map the dataArray to multiply the price by 10 --> this makes the price more accurate
                    dataArray = dataArray.map(function(element) {
                        return {activity: element.activity, type: element.type, participants: element.participants, price: element.price*10}
                    })
                    //second map on the dataArray to capitalize the activity type 
                    dataArray = dataArray.map(function(element) {
                        let elementType;
                        //if activity type is diy capitalize the entire type
                        if (element.type === 'diy') {
                            elementType = element.type.toUpperCase();
                            //else capitalize only the first letter of the activity type
                        } else if (element.type !== 'diy') {
                            //split activity type into two variables - first letter and the rest of the word
                            let elementTypeUpper = element.type[0]
                            //upper case first letter
                            elementTypeUpper = elementTypeUpper.toUpperCase();
                            let elementTypeLower = element.type.slice(1);
                            //add the two variables together to get the capitalized word
                            elementType = elementTypeUpper + elementTypeLower
                        }
                        return {activity: element.activity, type: elementType, participants: element.participants, price: element.price}
                    })
                    //set the innerHTML of the activity name and description for each of the 5 activities
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

//Submit button will capture data from the form
submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    //put data into an object
    let commentObj = {
        Name: event.target.Name.value,
        Activity: event.target.Activity.value,
        Activity_Type: event.target.Activity_Type.value,
        Mood: event.target.Mood.value,
        Time: event.target.Time.value,
        Comments: event.target.Comments.value
  }
  //the form will be reset once the submit button is pressed
  event.target.reset();
  //render the comment to the DOM
  renderComment(commentObj)
  //add the comment to our db.json
  submitting(commentObj)
})

function renderComment(comment) {
    //create an element that can be appended to the DOM
    let commentSection = document.createElement('p')
    //give the element a classname
    commentSection.className = 'commentSection'
    //set the innerHTML of the element
    commentSection.innerHTML = `Name: ${comment.Name}
    <br>
    Activity: ${comment.Activity}
    <br>
    Activity Type: ${comment.Activity_Type}
    <br>
    Mood During Activity: ${comment.Mood}
    <br>
    Time to Complete the Activity: ${comment.Time}
    <br>
    Extra Comments: ${comment.Comments}`
    //append element to the DOM
    submittedCommentHeader.appendChild(commentSection)
}

function getAllComments() {
    //fetch all comment data
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    //render the comments to the DOM
    .then(commentData => commentData.forEach(comment => renderComment(comment)))
}

function submitting(commentObj) {
    //add new comments to db.json
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })
    .then(res => res.json())
}

//initialize comments to display
function initialize() {
    getAllComments()
}
initialize()

//remove children nodes so that we may filter for specific values
function removeChildren(parent) {
    //while the parent has a child
    while (parent.firstChild) {
        //continue to remove the child until all are gone
        parent.removeChild(parent.firstChild);
    }
}

commentFilter.addEventListener('change', (result) => {
    //remove all children
    removeChildren(submittedCommentHeader)
    //if we are default filtering then show all comments
    if (result.target.value === '') {
        //fetch all comments from db.json
        fetch('http://localhost:3000/comments')
        .then(res => res.json())
        //render comments to the DOM
        .then(commentData => commentData.forEach(comment => renderComment(comment)))
        //else if not filtering from a default value
    } else if (result.target.value !== '') {
        let filteredArray = [];
        //fetch data from db.json
        fetch('http://localhost:3000/comments')
        .then(res => res.json())
        .then(data => {
            //for each piece of data
            for (let each in data) {
                //if the activity type is what is being filtered for
                if (data[each].Activity_Type === result.target.value) {
                    //render that comment to the DOM
                    renderComment(data[each])
                }
            }    
        })
    }
})

completeCheckbox.addEventListener('change', (event) => {
    console.log(event)
    //if our completed checkbox is checked
    if (event.target.checked) {
        //crete a div to store an image tag
        let img = document.createElement('div')
        //give our tag an id
        img.setAttribute('id', 'img')
        //set the innerHTML to our congratulations gif
        img.innerHTML = "<br><img src='https://media0.giphy.com/media/ZhvduEq5hWKYsmhRAJ/giphy.gif' alt='Congratulations!'>"
        //appendChild to DOM
        interactionBar.appendChild(img)
        //else if our completed checkbox is not checked
    } else if (event.target.checked === false) {
        //remove the img tag
        interactionBar.removeChild(interactionBar.lastChild)
    }
})