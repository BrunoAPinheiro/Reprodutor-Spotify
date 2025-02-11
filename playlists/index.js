import bonJovi from './bonJovi.js';
// Comente as outras importações por enquanto
// import u2 from './u2.js';
// import bruceSpringsteen from './bruceSpringsteen.js';
// import theDoors from './theDoors.js';

export const playlists = {
    bonJovi,
    // u2,
    // bruceSpringsteen,
    // theDoors
};


export function getPlaylistById(id) {
    return playlists[id];
}

export function getAlbumInfo(playlist, albumId) {
    return playlist.albums[albumId];
}

export function getPlaylistTotalDuration(playlist) {
    return playlist.songs.length;
}

export function formatDuration(count) {
    return `${count} músicas`;
}

export function getAlbumTracks(playlist, albumId) {
    return playlist.songs.filter(song => song.albumId === albumId);
}

export function getAllAlbums(playlist) {
    return Object.entries(playlist.albums).map(([id, album]) => ({
        id,
        ...album,
        tracks: getAlbumTracks(playlist, id)
    }));
}
