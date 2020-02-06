let data = {
    teams : {
        away : {
            name : "Maison",
            tennis : "15-0",
            score : "7",
            possession : false,
            timeouts : 3
        },
        home : {
            name : "New Deal",
            tennis : "15-0",
            score : "0",
            possession : true,
            timeouts : 2
        },
    },
    quarter : "1st",
    quarterClock : "3:57",
    playClock   : "15",
    possession : {
        down: "3rd",
        distance: 11
    }
};

const league = "nfl";
const teams = vff.sportteams.league(league);

function register(name, value, selector){
    vff.registerControl(name, value).on(event => {
        document.querySelector(selector).innerText = event.data;
    });
}

vff.registerControl('home.team', teams[0].getName(), {ui : {type: 'dropdown', options : teams.map(team => team.getName())}}).on(event => {
    let team = vff.sportteams.team(event.data, league);
    document.querySelector('#banner .team.home .name').innerText = event.data;
    document.querySelector('#banner .team.home .logo').innerHTML = team.getLogo();
    document.querySelector('#banner .team.home').style.backgroundColor = '#' + team.getColors()[0];
});
vff.registerControl('away.team', teams[1].getName(), {ui : {type: 'dropdown', options : teams.map(team => team.getName())}}).on(event => {
    let team = vff.sportteams.team(event.data, league);
    document.querySelector('#banner .team.away .name').innerText = event.data;
    document.querySelector('#banner .team.away .logo').innerHTML = team.getLogo();
    document.querySelector('#banner .team.away').style.backgroundColor = '#' + team.getColors()[0];
});

register('home.name', data.teams.home.name, '#banner .team.home .name');
register('home.score', data.teams.home.score, '#banner .team.home .score .number');
register('home.tennis', data.teams.home.tennis, '#banner .team.home .tennis');


register('away.name', data.teams.away.name, '#banner .team.away .name');
register('away.score', data.teams.away.score, '#banner .team.away .score .number');
register('away.tennis', data.teams.away.tennis, '#banner .team.away .tennis');


register('game.quarter', data.quarter, '#banner .quarter');
register('game.quarterClock', data.quarterClock, '#banner .quarter-clock');
// register('game.playClock', data.playClock, '#banner .play-clock');
register('game.down', data.possession.down, '#banner .possession .down');
register('game.distance', data.possession.distance, '#banner .possession .distance');

vff.registerControl('home.possession', data.teams.home.possession).on(event => {
    if(event.data){
        document.querySelector('#banner .team.home .possession').classList.add('active');
        vff.updateControl('away.possession', false);
    } else {
        document.querySelector('#banner .team.home .possession').classList.remove('active');
        vff.updateControl('away.possession', true);
    }
});
vff.registerControl('away.possession', data.teams.away.possession).on(event => {
    if(event.data){
        document.querySelector('#banner .team.away .possession').classList.add('active');
        vff.updateControl('home.possession', false);
    } else {
        document.querySelector('#banner .team.away .possession').classList.remove('active');
        vff.updateControl('home.possession', true);
    }
});

vff.registerControl('home.timeouts', data.teams.home.timeouts, {ui : {type:'radio', options : [0,1,2,3]}}).on(event => {
    let timeouts = document.querySelector('#banner .team.home .timeouts');
    timeouts.innerHTML = '';
    for(let i = 0 ; i < event.data ; i++){
        let t = document.createElement("div");
        t.classList.add('timeout');
        timeouts.appendChild(t);
    }
});
vff.registerControl('away.timeouts', data.teams.away.timeouts, {ui : {type:'radio', options : [0,1,2,3]}}).on(event => {
    let timeouts = document.querySelector('#banner .team.away .timeouts');
    timeouts.innerHTML = '';
    for(let i = 0 ; i < event.data ; i++){
        timeouts.innerHTML += '<div class="timeout"></div>';
    }
});


window.onload = function(){
    let clock = vff('#play-clock');
    clock.on('time',(time)=> {
        if(time < 5000){
            document.querySelector('.play-clock').style.backgroundColor = 'red'
        } else {
            document.querySelector('.play-clock').style.backgroundColor = 'black'
        }

    })
}
