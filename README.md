The Vodka Drink Experience

The goals of the project are:

1.) Use the public vodka URI which is located at
https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka

2.) Create a function that extracts selected data from the URI, formats data and creates a db.json file for all the unique drinks in the following format:

"drinks": [
{
"drinkId": 13196,
"drinkName": "Long vodka",
"avatar": "https://www.thecocktaildb.com/images/media/drink/9179i01503565212.jpg",
"glassType": "Highball glass",
"likes": 0,
"instructions": "Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Por the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka",
"ingredients": [
"5 cl Vodka",
"1/2 Lime",
"4 dashes Angostura bitters",
"1 dl Schweppes Tonic water",
"4 Ice"
],
"comments": " ",
"id": 1
},
{
"drinkId": 16967,
"drinkName": "Vodka Fizz",
"avatar": "https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg",
"glassType": "White wine glass",
"likes": 0,
"instructions": "Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top.",
"ingredients": [
"2 oz Vodka",
"2 oz Half-and-half",
"2 oz Limeade",
"Vodka",
"Nutmeg"
],
"comments": " ",
"id": 2
},

3.) Create code to render an appealing page with every vodka drink and its individual drink's data in a formatted manner using code, HTML and style sheet attributes.

4.) Create code to enable users to manipulate the rendered data as well as display manipulated data.

Functionability to be performed

Users should be able to perform the following functionality:

1.) Each unique drink should be clearly formatted so user can easily identify each drink and its attributes

2.) Ability to like a specific vodka drink

3.) Create a form to give user the ability to add a comment for a specific vodka drink

4.) Ability to delete a specific drink

Processes to accomplish desired functionalities

1.) How to present each drink - Create fetches to read through entire JSON file - For each drink update the DOM to display drink and its attributes - Create each attribute element with attributes that can be used to sytle, set/retrieve its values and if required add event listeners - Using style sheet attrbutes, "prettify" each drink and its attributes

2.) How to give the user the abiltiy to like a drink - Each drink should have a "Like" button - when the button is clicked the number of Likes should be incremented by one

3.) How to add/update a comment to a drink - Form should be generated at the top of the page - Form should contain a dropdown of the list of available vodka drinks - Form should contain a text field should be provided where comment can be entered - Form should contain a submit button. When clicked, selected drink and input text should be added/updated to specific drinks attributes

4.) How to delete a drink - Each drink should contain a Delete button - When the Delete button is clicked, the following task need to be accomplished:
a.) A Fetch Delete should be run against the JSON file to remove its contents
b.) Drink "frame" and its contents should be removed from the DOM
c.) The dropdown needs to reflect drink has been deleted by not having the ability to select it
