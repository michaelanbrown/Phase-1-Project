fetch("https://www.boredapi.com/api/activity")
.then(function (res) {
    return res.json();
})
.then(function(data) {
    console.log(data)
})