// playlists/bonJovi.js
export default {
    id: 'bonJovi',
    name: "Bon Jovi Hits",
    artist: "Bon Jovi",
    coverFolder: "bon_jovi",
    songsFolder: "bon_jovi",
    albums: {
        slippery_when_wet: {
            name: "Slippery When Wet",
            year: 1986,
            cover: "slippery_when_wet_cover"
        },
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
            title: "Livin' on a Prayer",
            artist: "Bon Jovi",
            file: "livin_on_a_prayer",
            albumId: "slippery_when_wet"
        },
        {
            title: "You Give Love a Bad Name",
            artist: "Bon Jovi",
            file: "you_give_love_a_bad_name",
            albumId: "slippery_when_wet"
        },
        {
            title: "Wanted Dead or Alive",
            artist: "Bon Jovi",
            file: "wanted_dead_or_alive",
            albumId: "slippery_when_wet"
        },
        {
            title: "Bad Medicine",
            artist: "Bon Jovi",
            file: "bad_medicine",
            albumId: "new_jersey"
        },
        {
            title: "Born to Be My Baby",
            artist: "Bon Jovi",
            file: "born_to_be_my_baby",
            albumId: "new_jersey"
        },
        {
            title: "I'll Be There for You",
            artist: "Bon Jovi",
            file: "ill_be_there_for_you",
            albumId: "new_jersey"
        },
        {
            title: "Keep the Faith",
            artist: "Bon Jovi",
            file: "keep_the_faith",
            albumId: "keep_the_faith"
        },
        {
            title: "Bed of Roses",
            artist: "Bon Jovi",
            file: "bed_of_roses",
            albumId: "keep_the_faith"
        },
        {
            title: "In These Arms",
            artist: "Bon Jovi",
            file: "in_these_arms",
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