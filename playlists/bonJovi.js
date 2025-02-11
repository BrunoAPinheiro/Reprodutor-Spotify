export default {
    id: 'bonJovi',
    name: "Bon Jovi Hits",
    artist: "Bon Jovi",
    coverFolder: "bon_jovi", // deve corresponder exatamente ao nome da pasta
    songsFolder: "bon_jovi", // deve corresponder exatamente ao nome da pasta
    albums: {
        slippery_when_wet: {
            name: "Slippery When Wet",
            year: 1986,
            cover: "slippery_when_wet_cover" // deve corresponder ao nome do arquivo sem .jpg
        },
        // ... outros álbuns
    },
    songs: [
        {
            title: "Livin' on a Prayer",
            artist: "Bon Jovi",
            file: "livin_on_a_prayer", // deve corresponder ao nome do arquivo sem .mp3
            albumId: "slippery_when_wet"
        },
        // ... outras músicas
    ]
};
