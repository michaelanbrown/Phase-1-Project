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
let dataArray =[];

//This event listener create an array of data from the API to be pushed to the DOM, we then map the array to mulitply the price by 10 to create a whole dollar amount
//then map it a second time to either uppercase the entire activity type (which we will do if the activity type is DIY), or only uppercase the first letter if the activity type is
//anything other than DIY
//Next, we will set the innerHTML for each section to be our activity name based on the index of our dataArray --> The first setion will be dataArray[0].activity
//We will create a p tag, give it an id, and set the innerHTMLS for each section based on the index of our dataArray --> This will include dataArray[0].type,
//dataArray[0].participants, and dataArray[0].price
//We will append our newly created p tag to the parent, which holds our activity name as stated in line 19
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


//Submit button will capture data from the form and put it into an object with approporiate key names
//The form will be reset once the submit button has been pressed, then we will call the renderComment and submitting functions
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

//renderComment creates an p tag that will be appended to the DOM
//We will give this element a classname and set the innerHTML to display our newly inputted comment data
//The newly created element will be appended to the DOM in our comment section
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

//getAllComments will fetch all submitted comments, which are housed in our db.json file and will render each comment to the DOM for viewing
function getAllComments() {
    //fetch all comment data
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    //render the comments to the DOM
    .then(commentData => commentData.forEach(comment => renderComment(comment)))
}

//submitting will create a POST request to our db.json file for new comments to house and store them so that they can be grabbed from the file and displayed on the DOM
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

//We use and call the initialize function so that our getAllComments function is called and our comments are displayed to the DOM
function initialize() {
    getAllComments()
}
initialize()


//removes all child nodes so that we may filter for specific values
function removeChildren(parent) {
    //while the parent has a child
    while (parent.firstChild) {
        //continue to remove the child until all are gone
        parent.removeChild(parent.firstChild);
    }
}

//we remove all child nodes so that we may then change all of what is displayed to the DOM in the comment section
//if the filter is in its default stage being blank (''), then we will call getAllComments(), which will display all comments to the DOM
//if the filter has a different value selected, then we will fetch the data for that activity type from the dom and use the renderComment function to display them to the DOM
commentFilter.addEventListener('change', (result) => {
    //remove all children
    removeChildren(submittedCommentHeader)
    //if we are default filtering then show all comments
    if (result.target.value === '') {
        //fetch all comments from db.json
        getAllComments();
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

//If our checkbox is pressed, then we will create a div element, give it an id, and set the innerHTML to be an img tag with our congratulations gif
//we will then append the newly created div element to our DOM, under the checkbox and randomize button
//If our checkbox is not pressed anymore, then we will call removeChild on our lastChild (this is because we something is appended as a child to the DOM, it is always appended as the
//last child)
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