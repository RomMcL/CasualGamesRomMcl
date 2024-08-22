import { soundsDict } from "./parametersGame.js"


export const createPlayer = () => {

    const audioPlayer = document.createElement('div');   
    audioPlayer.id = 'audio-player';

    const btnPlayPause = document.createElement('button');   
    btnPlayPause.id = 'btn-playPause';
    btnPlayPause.classList.add('player-btn');
    const btnStop = document.createElement('button');   
    btnStop.id = 'btn-stop';
    btnStop.classList.add('player-btn');
    const btnVolume = document.createElement('button');   
    btnVolume.id = 'btn-volume';
    btnVolume.classList.add('player-btn');
    btnVolume.name = 'min';
    const volumeValue = document.createElement('span');   
    volumeValue.id = 'volume-value';

    audioPlayer.append(btnPlayPause, btnStop, btnVolume, volumeValue);

    const player = document.getElementById('music');
    const cardCenter = document.querySelector('.game-card-center');
    let volume = 0.2;  
       
    const playPauseAudio = () => {
        
        if (player.paused || player.ended) {
            btnPlayPause.style.backgroundImage = soundsDict['pause'];
            player.play();
            cardCenter.style.backgroundImage = 'url("./img/layoutDesigner/music_djun.png")';
        } else {
            btnPlayPause.style.backgroundImage = soundsDict['play'];
            player.pause();
            cardCenter.style.backgroundImage = 'url("./img/layoutDesigner/wtf_djun.png")';
        }
    }
       
    const stopAudio = () => {
        player.pause();
        player.currentTime && (player.currentTime = 0);
        btnPlayPause.style.backgroundImage = soundsDict['play'];
        cardCenter.style.backgroundImage = 'url("./img/layoutDesigner/focused_djun.png")';
    }
    
    const volumeStep = () => {
        if (btnVolume.name == 'min') {
            volume = 1;
            btnVolume.name = 'max';
            volumeValue.textContent = 'max';
            btnVolume.style.backgroundImage = soundsDict['volume2'];
        } else if (btnVolume.name == 'max') {
            volume = 0;
            btnVolume.name = 'mute';
            volumeValue.textContent = 'mute';
            btnVolume.style.backgroundImage = soundsDict['mute'];
        } else {
            volume = 0.2;
            btnVolume.name = 'min';
            volumeValue.textContent = 'min';
            btnVolume.style.backgroundImage = soundsDict['volume1'];
        }
        player.volume = volume;
    }


    btnPlayPause.addEventListener('click', playPauseAudio);
    btnStop.addEventListener('click', stopAudio);
    btnVolume.addEventListener('click', volumeStep);

    player.volume = volume;
    volumeValue.textContent = btnVolume.name;
    
    return audioPlayer;
}
