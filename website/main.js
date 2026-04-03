// Kyran - Final Project (Assignment 5B)

let top10Leaders = document.getElementById('topTenLeaders').getContext('2d')
let averageRuntimes = document.getElementById('averageRuntimes').getContext('2d')
let platformChart = document.getElementById('platformChart').getContext('2d')
let recordDaysCounter = document.getElementById('recordDaysCounter').getContext('2d')

let gameTitle = document.getElementById('gameTitle')
let gameLogo = document.getElementById('gameLogo')
let categoryName = document.getElementById('categoryTitle')
let totalRuns = document.getElementById('totalRuns')

let prev = document.getElementById('Previous')
let refresh = document.getElementById('Refresh')
let next = document.getElementById('Next')


let gameId = 'o1y9wo6q' // ID of the game I am doing the dashboard on (Super Mario 64)
let category = 0

// Contains data 
const api = {

    platforms:{
        'N64': 'w89rwelk' // Used for later function for detecting platforms players played Super Mario 64 on
    },

    categories:[ // Used for detecting which category ID to search for data with the API.
        'wkpoo02r', // 120 Star
        '7dgrrxk4', // 70 Star
        'n2y55mko', // 16 Star
        '7kjpp4k3', // 1 Star
        'xk9gg6d0', // 0 Star
    ]
}

// Charts
let recordDaysChart = new Chart(recordDaysCounter, {
    type: 'bar',
    options: {
        maintainAspectRatio: false  
    },
    data: {

        labels:[
            'Nintendo 64','Virtual Console','Emulation'
        ],

        datasets:[
        {
            label: 'Record Duration (Years)',
            data: [
            ],
            
            backgroundColor: ['#008000', '#FF0000', '#808080'],
        },
    ]   
    }
})
let consoleLeaderChart = new Chart(top10Leaders, {
    type: 'line',
    options: {
        maintainAspectRatio: false
    },
    data: {

        labels:[
            '1st','2nd','3rd','4th','5th','6th','8th','9th','10th'
        ],

        datasets:[
        {
            label: 'Nintendo 64',
            data: [
            ],
            
            backgroundColor: ['#008000'],
        },
        {
            label: 'Virtual Console',
            data: [
            ],
            
            backgroundColor: ['#FF0000'],
        },
        {
            label: 'Emulation',
            data: [
            ],
            
            backgroundColor: ['#808080'],
        },
    ]   
    }
})
let averageTimesChart = new Chart(averageRuntimes, {
    type: 'polarArea',
    options: {
        maintainAspectRatio: false
    },
    data: {

        labels:[
            'Nintendo 64','Virtual Console','Emulation'
        ],

        datasets:[
        {
            label: 'Average Runtime',
            data: [
            ],
            
            backgroundColor: ['#008000', '#FF0000', '#808080'],
        },
    ]   
    }
})
let platformUsers = new Chart(platformChart, {
    type: 'pie',
    options: {
        maintainAspectRatio: false
    },
    data: {

        labels:[
            'Nintendo 64', 'Virtual Console', 'Emulation'
        ],

        datasets:[
        {
            label: '',
            data: [],
            
            backgroundColor: ['#008000', '#FF0000', '#808080'],
        }]
        
    }
})


// Chart Setups
let setupAverageTimes = function(url){
    fetch(url).then((response) => response.json()).then((json) => {return json}).then
    (json => {
        averageTimesChart.data.datasets[0].data = []
        averageTimesChart.update()

    
        let data = json.data
    
        let runs = data.runs

        let totalN64Playtime = 0
        let totalVCPlaytime = 0
        let totalEmuPlaytime = 0

        let totalN64Users = 0
        let totalVCUsers = 0
        let totalEmuUsers = 0
        

        runs.map(runData => {
            let run = runData.run
            let system = run.system

            let time = run.times.realtime_t / 60

            if (system.emulated === true) {
                totalEmuPlaytime += time
                totalEmuUsers++
            } else if (system.platform === api.platforms.N64) {
                totalN64Playtime += time
                totalN64Users++
            } else {    
                totalVCPlaytime += time
                totalVCUsers++
            }
        })

        let n64Average = (totalN64Playtime / totalN64Users)
        let vcAverage = (totalVCPlaytime / totalVCUsers)
        let emuAverage = (totalEmuPlaytime / totalEmuUsers)

        let averages = [n64Average,vcAverage,emuAverage]

        averages.map(val => {
            averageTimesChart.data.datasets[0].data.push(val)
        })
        
        averageTimesChart.update()
    })
}
let setupPlatform = function(url){
    fetch(url).then((response) => response.json()).then((json) => {return json}).then
    (json => {
        platformUsers.data.datasets[0].data = []
        platformUsers.update()

        let data = json.data
    
        let runs = data.runs
    
        let amountOfN64 = 0
        let amountOfVC = 0
        let amountOfEmu = 0
    

        runs.map(runData => {
            let run = runData.run
            let system = run.system

            if (system.emulated === true) {
                amountOfEmu++
            } else if (system.platform === api.platforms.N64) {
                amountOfN64++
            } else {
                amountOfVC++
            }
        })

        let players = [amountOfN64,amountOfVC,amountOfEmu]

        totalRuns.textContent = 'Total Runs: ' + (amountOfEmu + amountOfVC + amountOfN64)

        players.map(val => {
            platformUsers.data.datasets[0].data.push(val)
        })

        platformUsers.update()
    })
}
let setupLeaderChart = function(url){
    fetch(url).then((response) => response.json()).then((json) => {return json}).then
    (json => {
        consoleLeaderChart.data.datasets[0].data = []
        consoleLeaderChart.data.datasets[1].data = []
        consoleLeaderChart.data.datasets[2].data = []
        consoleLeaderChart.update()
    
        let data = json.data
    
        let runs = data.runs
    
        let topN64Runs = [
            
        ]
        let topVcRuns = [
    
        ]
        let topEmuRuns = [
    
        ]

        runs.map(runData => {
            let run = runData.run
            let system = run.system

            let obj = {
                'time': (run.times.realtime_t / 60),
            }

            if (system.emulated === true) {
                if (topEmuRuns.length < 10) {
                    topEmuRuns.push(obj)
                }
            } else if (system.platform === api.platforms.N64) {
                if (topN64Runs.length < 10) {
                    topN64Runs.push(obj)
                }
            } else {    
                if (topVcRuns.length < 10) {
                    topVcRuns.push(obj)
                }
            }
        })

        topN64Runs.map(data => {
            consoleLeaderChart.data.datasets[0].data.push(data.time)
        })
        topVcRuns.map(data => {
            consoleLeaderChart.data.datasets[1].data.push(data.time)
        })
        topEmuRuns.map(data => {
            consoleLeaderChart.data.datasets[2].data.push(data.time)
        })
        consoleLeaderChart.update()
    })
}
let setupRecordCounter = function(url){
    fetch(url).then((response) => response.json()).then((json) => {return json}).then
    (json => {
        recordDaysChart.data.datasets[0].data = []
        recordDaysChart.update()
    
        let currentDay = new Date

        let data = json.data
    
        let runs = data.runs
    
        let n64RecordDuration = {
            place: Infinity,
            duration: Infinity
        };
        let vcRecordDuration = {
            place: Infinity,
            duration: Infinity            
        };
        let emuRecordDuration = {
            place: Infinity,
            duration: Infinity            
        };

        runs.map(runData => {
            let run = runData.run
            let system = run.system
            let place = runData.place

            submitted = Date.parse(run.date)
            let calc = currentDay - submitted
            calc = calc / 31536000000


            if (system.emulated === true) {
                if (calc < emuRecordDuration.duration && place < emuRecordDuration.place) {
                    emuRecordDuration.place = place
                    emuRecordDuration.duration = calc
                }
            } else if (system.platform === api.platforms.N64) {
                if (calc < n64RecordDuration.duration && place < n64RecordDuration.place) {
                    n64RecordDuration.place = place
                    n64RecordDuration.duration = calc
                }
            } else {    
                if (calc < vcRecordDuration.duration && place < vcRecordDuration.place) {
                    vcRecordDuration.place = place
                    vcRecordDuration.duration = calc
                }
            }
        })

        const durations = [n64RecordDuration,vcRecordDuration,emuRecordDuration]

        durations.map(data => {
            recordDaysChart.data.datasets[0].data.push(data.duration)
        })

        recordDaysChart.update()
    })
}



// Dashboard Setup
let setupDashboard = function(){
    let gameUrl = 'https://www.speedrun.com/api/v1/games/'+ gameId
    let categoryUrl = 'https://www.speedrun.com/api/v1/categories/' + api.categories[category]
    let leaderboard = 'https://www.speedrun.com/api/v1/leaderboards/'+ gameId + '/category/' + api.categories[category] 

    fetch(gameUrl).then((response) => response.json()).then((json) => {return json}).then(json => {
        gameTitle.textContent = json.data.names.international
        gameLogo.src = json.data.assets['cover-large'].uri
    })

    fetch(categoryUrl).then((response) => response.json()).then((json) => {return json}).then(json => {

        categoryName.textContent = json.data.name
    })

    setupAverageTimes(leaderboard)
    setupPlatform(leaderboard)
    setupLeaderChart(leaderboard)
    setupRecordCounter(leaderboard)
}


// Button Functions
prev.onclick = function(){
    if (category === 0) {
        category = api.categories.length-1
    } else {
        category --
    }

    setupDashboard()
}
next.onclick = function(){
    if (category === api.categories.length-1) {
        category = 0
    } else {
        category ++
    }


    setupDashboard()
}
refresh.onclick = setupDashboard

setupDashboard()




/*
REFERENCES

https://www.chartjs.org/docs/latest/developers/updates.html  -  Updating & Clearing data from Charts
https://www.speedrun.com/sm64  - Webpage of all records referenced for Super Mario 64
https://github.com/speedruncomorg/api/tree/master/version1  - API documentation
https://www.w3schools.com/jsref/event_onclick.asp  - onclick event
https://www.w3schools.com/jsref/jsref_parse.asp - Date parse

*/