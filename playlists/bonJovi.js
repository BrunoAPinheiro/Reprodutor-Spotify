export default {
    id: 'bonJovi',
    name: "Bon Jovi Hits",
    artist: "Bon Jovi",
    coverFolder: "bon_jovi",
    songsFolder: "bon_jovi",
    albums: {
        new_jersey: {
            name: "New Jersey",
            year: 1988,
            cover: "new_jersey_cover"
        },
        keep_the_faith: {
            name: "Keep the Faith",
            year: 1992,
            cover: "keep_the_faith_cover"
        },
        crush: {
            name: "Crush",
            year: 2000,
            cover: "crush_cover"
        }
    },
    songs: [
        {
            title: "I'll Be There For You",
            artist: "Bon Jovi",
            file: "ill_be_there_for_you",
            albumId: "new_jersey"
        },
        {
            title: "Bed Of Roses",
            artist: "Bon Jovi",
            file: "bed_of_roses",
            albumId: "keep_the_faith"
        },
        {
            title: "It's My Life",
            artist: "Bon Jovi",
            file: "its_my_life",
            albumId: "crush"
        }
    ]
};
