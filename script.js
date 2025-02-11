elements.cover.src = `./images/${playlist.coverFolder}/${track.file}.jpg`;
elements.audio.src = `./songs/${playlist.songsFolder}/${track.file}.mp3`;

// ============= IMPORTAÇÕES =============
import { playlists, getPlaylistById, getPlaylistTotalDuration, formatDuration, getAlbumInfo } from './playlists/index.js';

// ============= ELEMENTOS DO DOM =============
const elements = {
    audio: document.getElementById('audio'),
    cover: document.getElementById('cover'),
    songName: document.getElementById('song-name'),
    bandName: document.getElementById('band-name'),
    albumInfo: document.getElementById('album-info'),
    playlistTitle: document.querySelector('.playlist-title'),
    playlistSelect: document.getElementById('playlist-select'),
    playlistSongCount: document.getElementById('playlist-song-count'),
    playlistDuration: document.getElementById('playlist-duration'),
    progress: {
        current: document.getElementById('current-progress'),
        bar: document.getElementById('progress-bar'),
        time: document.getElementById('song-time'),
        total: document.getElementById('total-time')
    },
    buttons: {
        play: document.getElementById('play'),
        prev: document.getElementById('previous'),
        next: document.getElementById('next'),
        shuffle: document.getElementById('shuffle'),
        repeat: document.getElementById('repeat'),
        like: document.getElementById('like')
    },
    volume: {
        control: document.querySelector('.volume-control'),
        button: document.querySelector('.volume-control i'),
        slider: document.querySelector('.volume-control input')
    }
};

// ============= ESTADO DO PLAYER =============
const playerState = {
    currentPlaylistId: localStorage.getItem('currentPlaylistId') || 'bonJovi',
    currentTrackIndex: parseInt(localStorage.getItem('currentTrackIndex')) || 0,
    currentTime: parseFloat(localStorage.getItem('currentTime')) || 0,
    isPlaying: false,
    isShuffled: JSON.parse(localStorage.getItem('shuffleState')) || false,
    isRepeating: JSON.parse(localStorage.getItem('repeatState')) || false,
    likedTracks: new Set(JSON.parse(localStorage.getItem('likedTracks')) || []),
    volume: parseFloat(localStorage.getItem('volume')) || 1,
    lastVolume: 1,
    isChangingTrack: false,
    playHistory: []
};

// ============= FUNÇÕES DE PLAYLIST E ÁLBUM =============
function getCurrentPlaylist() {
    return getPlaylistById(playerState.currentPlaylistId);
}

function getCurrentTrack() {
    const playlist = getCurrentPlaylist();
    return playlist.songs[playerState.currentTrackIndex];
}

function getCurrentAlbumInfo() {
    const track = getCurrentTrack();
    const playlist = getCurrentPlaylist();
    return getAlbumInfo(playlist, track.albumId);
}

function updatePlaylistInfo() {
    const playlist = getCurrentPlaylist();
    elements.playlistTitle.textContent = playlist.name;
    elements.playlistSongCount.textContent = `${playlist.songs.length} músicas`;
    elements.playlistDuration.textContent = formatDuration(getPlaylistTotalDuration(playlist));
}

// ============= FUNÇÕES DO PLAYER =============


async function loadTrack() {
    const track = getCurrentTrack();
    const playlist = getCurrentPlaylist();
    const album = getCurrentAlbumInfo();
    
    try {
        await elements.audio.pause();
        
        
        // Zera o progresso antes de carregar nova música
        elements.progress.current.style.width = '0%';
        elements.progress.time.textContent = '00:00';
        elements.progress.total.textContent = '00:00';
        
        elements.cover.classList.add('changing');
        elements.cover.src = `./images/${playlist.coverFolder}/${album.cover}.jpg`;
        elements.audio.src = `./songs/${playlist.songsFolder}/${track.file}.mp3`;
        elements.songName.textContent = track.title;
        elements.bandName.textContent = track.artist;
        
        if (elements.albumInfo) {
            elements.albumInfo.textContent = `${album.name} (${album.year})`;
        }
        
        elements.audio.volume = playerState.volume;
        
        await elements.audio.load();
        
        // Restaura o ponto onde a música parou (apenas se não estiver mudando de música)
        if (playerState.currentTime > 0 && !playerState.isChangingTrack) {
            elements.audio.currentTime = playerState.currentTime;
        } else {
            playerState.currentTime = 0;
            elements.audio.currentTime = 0;
        }

        updateControls();
        
        setTimeout(() => {
            elements.cover.classList.remove('changing');
        }, 300);

        // Adiciona à história de reprodução
        if (!playerState.isChangingTrack) {
            playerState.playHistory.push({
                playlistId: playerState.currentPlaylistId,
                trackIndex: playerState.currentTrackIndex
            });
            
            if (playerState.playHistory.length > 50) {
                playerState.playHistory.shift();
            }
        }

    } catch (error) {
        console.log('Erro ao carregar música:', error);
    }
}

async function playTrack() {
    try {
        await elements.audio.play();
        playerState.isPlaying = true;
        updateControls();
    } catch (error) {
        console.log('Erro ao reproduzir:', error);
        playerState.isPlaying = false;
        updateControls();
    }
}

function pauseTrack() {
    elements.audio.pause();
    playerState.isPlaying = false;
    updateControls();
}

function nextTrack() {
    const playlist = getCurrentPlaylist();
    
    playerState.isChangingTrack = true;
    
    if (playerState.isShuffled) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.songs.length);
        } while (nextIndex === playerState.currentTrackIndex && playlist.songs.length > 1);
        playerState.currentTrackIndex = nextIndex;
    } else {
        playerState.currentTrackIndex = (playerState.currentTrackIndex + 1) % playlist.songs.length;
    }
    
    loadTrack().then(() => {
        if (playerState.isPlaying) playTrack();
        playerState.isChangingTrack = false;
    });
    saveState();
}

function previousTrack() {
    const playlist = getCurrentPlaylist();
    
    if (elements.audio.currentTime > 3) {
        elements.audio.currentTime = 0;
        playerState.currentTime = 0;
    } else {
        playerState.isChangingTrack = true;
        playerState.currentTrackIndex = (playerState.currentTrackIndex - 1 + playlist.songs.length) % playlist.songs.length;
        loadTrack().then(() => {
            if (playerState.isPlaying) playTrack();
            playerState.isChangingTrack = false;
        });
    }
    saveState();
}

// ============= CONTROLES DE INTERFACE =============
function updateControls() {
    // Play/Pause
    const playIcon = elements.buttons.play.querySelector('i');
    playIcon.classList.remove('bi-play-circle-fill', 'bi-pause-circle-fill');
    playIcon.classList.add(playerState.isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill');
    
    // Shuffle
    elements.buttons.shuffle.classList.toggle('active', playerState.isShuffled);
    
    // Repeat
    elements.buttons.repeat.classList.toggle('active', playerState.isRepeating);
    
    // Like
    const trackId = `${playerState.currentPlaylistId}-${playerState.currentTrackIndex}`;
    elements.buttons.like.classList.toggle('active', playerState.likedTracks.has(trackId));
    
    // Volume
    updateVolumeIcon(playerState.volume);
}

function updateProgress() {
    const duration = elements.audio.duration;
    const currentTime = elements.audio.currentTime;
    const progress = (currentTime / duration) * 100;
    
    elements.progress.current.style.width = `${progress}%`;
    elements.progress.time.textContent = formatTime(currentTime);
    if (duration) elements.progress.total.textContent = formatTime(duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetProgress() {
    elements.progress.current.style.width = '0%';
    elements.progress.time.textContent = '00:00';
    if (elements.audio.duration) {
        elements.progress.total.textContent = formatTime(elements.audio.duration);
    } else {
        elements.progress.total.textContent = '00:00';
    }
}

// ============= CONTROLES DE VOLUME =============
function updateVolumeIcon(value) {
    const icon = elements.volume.button;
    icon.classList.remove('bi-volume-up', 'bi-volume-down', 'bi-volume-mute');
    
    if (value === 0) {
        icon.classList.add('bi-volume-mute');
    } else if (value < 0.5) {
        icon.classList.add('bi-volume-down');
    } else {
        icon.classList.add('bi-volume-up');
    }
}

function updateVolume(value) {
    playerState.volume = value;
    elements.audio.volume = value;
    updateVolumeIcon(value);
    saveState();
}

// ============= CONTROLES DE ESTADO =============
function toggleShuffle() {
    playerState.isShuffled = !playerState.isShuffled;
    updateControls();
    saveState();
}

function toggleRepeat() {
    playerState.isRepeating = !playerState.isRepeating;
    updateControls();
    saveState();
}

function toggleLike() {
    const trackId = `${playerState.currentPlaylistId}-${playerState.currentTrackIndex}`;
    if (playerState.likedTracks.has(trackId)) {
        playerState.likedTracks.delete(trackId);
    } else {
        playerState.likedTracks.add(trackId);
    }
    updateControls();
    saveState();
}

function saveState() {
    const state = {
        currentPlaylistId: playerState.currentPlaylistId,
        currentTrackIndex: playerState.currentTrackIndex,
        currentTime: elements.audio.currentTime,
        isShuffled: playerState.isShuffled,
        isRepeating: playerState.isRepeating,
        likedTracks: Array.from(playerState.likedTracks),
        volume: playerState.volume
    };
    localStorage.setItem('playerState', JSON.stringify(state));
}

function restoreState() {
    try {
        const savedState = JSON.parse(localStorage.getItem('playerState'));
        if (savedState) {
            playerState.currentPlaylistId = savedState.currentPlaylistId;
            playerState.currentTrackIndex = savedState.currentTrackIndex;
            playerState.currentTime = savedState.currentTime;
            playerState.isShuffled = savedState.isShuffled;
            playerState.isRepeating = savedState.isRepeating;
            playerState.likedTracks = new Set(savedState.likedTracks);
            playerState.volume = savedState.volume;
        }
    } catch (e) {
        console.log('Erro ao restaurar estado:', e);
    }
}

// ============= EVENT LISTENERS =============
function initializeEventListeners() {
    // Controles principais
    elements.buttons.play.addEventListener('click', () => {
        if (playerState.isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });
    
    elements.buttons.next.addEventListener('click', nextTrack);
    elements.buttons.prev.addEventListener('click', previousTrack);
    elements.buttons.shuffle.addEventListener('click', toggleShuffle);
    elements.buttons.repeat.addEventListener('click', toggleRepeat);
    elements.buttons.like.addEventListener('click', toggleLike);
    
    // Progresso
    elements.progress.bar.addEventListener('click', (e) => {
        const width = elements.progress.bar.clientWidth;
        const clickPosition = e.offsetX;
        const jumpToTime = (clickPosition / width) * elements.audio.duration;
        elements.audio.currentTime = jumpToTime;
        playerState.currentTime = jumpToTime;
        saveState();
    });
    
    // Volume
    elements.volume.slider.addEventListener('input', (e) => updateVolume(e.target.value));
    elements.volume.button.addEventListener('click', () => {
        if (elements.audio.volume > 0) {
            playerState.lastVolume = elements.audio.volume;
            updateVolume(0);
            elements.volume.slider.value = 0;
        } else {
            updateVolume(playerState.lastVolume || 1);
            elements.volume.slider.value = playerState.lastVolume || 1;
        }
    });
    
    // Áudio
    elements.audio.addEventListener('timeupdate', () => {
        updateProgress();
        if (!playerState.isChangingTrack) {
            playerState.currentTime = elements.audio.currentTime;
            saveState();
        }
    });
    
    elements.audio.addEventListener('ended', () => {
        if (playerState.isRepeating) {
            elements.audio.currentTime = 0;
            playTrack();
        } else {
            nextTrack();
        }
    });
    
    // Playlist
    elements.playlistSelect.addEventListener('change', (e) => {
        playerState.currentPlaylistId = e.target.value;
        playerState.currentTrackIndex = 0;
        playerState.currentTime = 0;
        playerState.isChangingTrack = true;
        updatePlaylistInfo();
        loadTrack().then(() => {
            if (playerState.isPlaying) playTrack();
            playerState.isChangingTrack = false;
        });
        saveState();
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            playerState.isPlaying ? pauseTrack() : playTrack();
        } else if (e.code === 'ArrowRight') {
            nextTrack();
        } else if (e.code === 'ArrowLeft') {
            previousTrack();
        } else if (e.code === 'ArrowUp') {
            const newVolume = Math.min(1, playerState.volume + 0.1);
            updateVolume(newVolume);
            elements.volume.slider.value = newVolume;
        } else if (e.code === 'ArrowDown') {
            const newVolume = Math.max(0, playerState.volume - 0.1);
            updateVolume(newVolume);
            elements.volume.slider.value = newVolume;
        }
    });

    // Salvar estado ao fechar/recarregar página
    window.addEventListener('beforeunload', () => {
        if (!playerState.isChangingTrack) {
            playerState.currentTime = elements.audio.currentTime;
            saveState();
        }
    });
}

// ============= INICIALIZAÇÃO =============
function initializePlayer() {
    // Restaurar estado salvo
    restoreState();
    
    // Restaurar volume
    elements.volume.slider.value = playerState.volume;
    elements.audio.volume = playerState.volume;
    
    // Restaurar playlist selecionada
    elements.playlistSelect.value = playerState.currentPlaylistId;
    
    // Inicializar informações da playlist
    updatePlaylistInfo();
    
    // Configurar eventos
    initializeEventListeners();
    
    // Carregar música
    loadTrack().then(() => {
        // Restaurar posição da música
        if (playerState.currentTime > 0) {
            elements.audio.currentTime = playerState.currentTime;
        }
        updateControls();
    });
}

// Iniciar o player
initializePlayer();
