# My Phase 1 Project

## Randomizer

We are randomizing activities that may be performed when someone needs to cure their boredom.

## Description

The 'Randomizer' button renders 5 activities for the user to choose from, the activity at the top is what is the most suggested.
Once complete there is a checkbox that when checked will display a 'Congratulations!' gif, when unchecked the gif will disappear.
On the right there is a form to input feedback about the activity - your name, the activity, activity type, mood during the activity, time to complete, and any extra comments.
Under the form there is also a section that displays said comments. This section can be filtered by activity type so that the user may view other users's thoughts and opinions before engaging in the activity.

```bash
<button type="button" id="random">Randomize!</button>
```
```bash
<input type="checkbox" name="complete" value="Complete"/> Mark that you completed a task here!
```
```bash
img.innerHTML = "<br><img src='https://media0.giphy.com/media/ZhvduEq5hWKYsmhRAJ/giphy.gif' alt='Congratulations!'>"
```
```bash
<button type="submit" id="submit">Submit!</button>
```
```bash
<h5 id="filter-header">Filter by Activity Type:</h5>
```

## Comment Usage Example

```python
# Comment HTML

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
```

## Contributing

Suggestions are welcome.

## Acknowledgment
Congratulations Gif Source: https://media0.giphy.com/media/ZhvduEq5hWKYsmhRAJ/giphy.gif
API Source: https://www.boredapi.com/api/activity