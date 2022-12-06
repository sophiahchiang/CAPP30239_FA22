/* Bar chart totals by gender */

d3.json("features_by_playlist.json").then((data) => {
  // Always start by console.logging the data
  console.log("Raw data", data);

  for (let playlist of data) {
    for (let song of playlist) {
    }
  }
});

[
  {
    danceability: 0.714,
    energy: 0.472,
    key: 2,
    loudness: -7.375,
    mode: 1,
    speechiness: 0.0864,
    acousticness: 0.013,
    instrumentalness: 4.51e-6,
    liveness: 0.266,
    valence: 0.238,
    tempo: 131.121,
    type: "audio_features",
    id: "3nqQXoyQOWXiESFLlDF1hG",
    uri: "spotify:track:3nqQXoyQOWXiESFLlDF1hG",
    track_href: "https://api.spotify.com/v1/tracks/3nqQXoyQOWXiESFLlDF1hG",
    analysis_url:
      "https://api.spotify.com/v1/audio-analysis/3nqQXoyQOWXiESFLlDF1hG",
    duration_ms: 156943,
    time_signature: 4,
  },
];
