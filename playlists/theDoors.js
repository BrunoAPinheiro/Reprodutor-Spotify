// playlists/theDoors.js
export default {
    id: 'theDoors',
    name: "The Doors Collection",
    artist: "The Doors",
    coverFolder: "the_doors",
    songsFolder: "the_doors",
    albums: {
        doors_first: {
            name: "The Doors",
            year: 1967,
            cover: "doors_first_cover"
        },
        strange_days: {
            name: "Strange Days",
            year: 1967,
            cover: "strange_days_cover"
        },
        waiting_sun: {
            name: "Waiting for the Sun",
            year: 1968,
            cover: "waiting_sun_cover"
        },
        soft_parade: {
            name: "The Soft Parade",
            year: 1969,
            cover: "soft_parade_cover"
        },
        morrison_hotel: {
            name: "Morrison Hotel",
            year: 1970,
            cover: "morrison_hotel_cover"
        },
        la_woman: {
            name: "L.A. Woman",
            year: 1971,
            cover: "la_woman_cover"
        }
    },
    songs: [
        {
            title: "Break on Through (To the Other Side)",
            artist: "The Doors",
            file: "break_on_through",
            albumId: "doors_first"
        },
        {
            title: "Light My Fire",
            artist: "The Doors",
            file: "light_my_fire",
            albumId: "doors_first"
        },
        {
            title: "The End",
            artist: "The Doors",
            file: "the_end",
            albumId: "doors_first"
        },
        {
            title: "Strange Days",
            artist: "The Doors",
            file: "strange_days",
            albumId: "strange_days"
        },
        {
            title: "People Are Strange",
            artist: "The Doors",
            file: "people_are_strange",
            albumId: "strange_days"
        },
        {
            title: "Love Me Two Times",
            artist: "The Doors",
            file: "love_me_two_times",
            albumId: "strange_days"
        },
        {
            title: "Hello, I Love You",
            artist: "The Doors",
            file: "hello_i_love_you",
            albumId: "waiting_sun"
        },
        {
            title: "The Unknown Soldier",
            artist: "The Doors",
            file: "the_unknown_soldier",
            albumId: "waiting_sun"
        },
        {
            title: "Touch Me",
            artist: "The Doors",
            file: "touch_me",
            albumId: "soft_parade"
        },
        {
            title: "Roadhouse Blues",
            artist: "The Doors",
            file: "roadhouse_blues",
            albumId: "morrison_hotel"
        },
        {
            title: "Peace Frog",
            artist: "The Doors",
            file: "peace_frog",
            albumId: "morrison_hotel"
        },
        {
            title: "Riders on the Storm",
            artist: "The Doors",
            file: "riders_on_the_storm",
            albumId: "la_woman"
        },
        {
            title: "L.A. Woman",
            artist: "The Doors",
            file: "la_woman",
            albumId: "la_woman"
        }
    ]
};