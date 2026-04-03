# Super Mario 64 Speedrun Data Analysis

For my final project in JavaScript, I was tasked to create a website utilizing a public charting library, and creating a data analysis dashboard using this library.

This project focuses on video game speedrunning data, specifically Super Mario 64, one of the most popular speedrun titles.
Speedrun.com has its own public API that can be used to retrieve data based on Game ID's, so I found what the ID was specifically for the game of choice.

The first factor to consider was the different speedrun categories.
Super Mario 64 is about collecting stars then beating the final boss of the game, the different speedrun categories are;

- 120 Stars
- 70 Stars
- 16 Stars
- 1 Star
- 0 Star

The second factor, was the different console types players may use. For speedrun.com, there are three specific ways players can play Super Mario 64;

- Nintendo 64 Original Hardware
- Virtual Console (This version was a re-release of the game for the Nintendo Wii)
- Emulator (Emulators are computer software created to essentially be a Virtual Machine of a video game console.)

The reason the console type matters and all have their own separate leaderboards, is due to the speed in which Super Mario 64 plays on each console type. 

Emulation will normally run Super Mario 64 at the fastest framerate, which will give players who use emulation an advantage over those on original hardware, as typically original hardware runs on slower framerates than emulation and Virtual Console. 


With these factors, the questions that I wanted to answer for myself were as follows;

- How do the top 10 players compare across platforms in terms of runtimes?
- How many players are there per platform?
- What are the average run times per platform?
- How long have each platform's record withstood for?


On the website I have created, you can click through the different categories. Here is an example of what the website looks like


Library: Chart.js, https://www.chartjs.org/
Speedrun Website: https://www.speedrun.com/sm64
API: https://github.com/speedruncomorg/api/tree/master/version1
