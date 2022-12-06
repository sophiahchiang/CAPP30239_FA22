import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
from requests.exceptions import ReadTimeout
import json

cid = "be87a399dedf4265a16407ffede0be35"
secret = "0c89e9cc49b6483fbc116b7bdb82b8bf"
client_credentials_manager = SpotifyClientCredentials(
    client_id=cid, client_secret=secret
)
sp = spotipy.Spotify(
    client_credentials_manager=client_credentials_manager,
    requests_timeout=10,
    retries=10,
)


# Get songs for every year from 2000-2022

# artist_name = []
# track_name = []
# popularity = []
# track_id = []

# for i in range(0,950,50):
#         track_results = sp.search(q='year:2000', type='track', limit=50,offset=i)
#         for i, t in enumerate(track_results['tracks']['items']):
#             artist_name.append(t['artists'][0]['name'])
#             track_name.append(t['name'])
#             track_id.append(t['id'])
#             popularity.append(t['popularity'])

# track_dataframe = pd.DataFrame({'artist_name' : artist_name, 'track_name' : track_name, 'track_id' : track_id, 'popularity' : popularity})
# print(track_dataframe.shape)
# print(track_dataframe.head())
# res = track_dataframe.to_json()
# res

# #Get top playlists in the US using category keyword 'toplists'
# playlist_name = []
# playlist_id = []
# desc = []

# for i in range(0,950,50):
#         playlist_results = sp.category_playlists('toplists', 'US',limit=50,offset=i)
#         for i, t in enumerate(playlist_results['playlists']['items']):
#             playlist_name.append(t['name'])
#             playlist_id.append(t['id'])
#             desc.append(t['description'])

# playlist_dataframe = pd.DataFrame({'playlist_name' : playlist_name, 'playlist_id' : playlist_id, 'description' : desc})
# print(playlist_dataframe.shape)
# print(playlist_dataframe)

# # Use the above top playlist IDs to get songs ids from each playlist
# song_name = []
# song_artist = []
# song_album = []
# song_id = []
# song_popularity = []
# song_duration = []
# song_explicit = []
# song_type = []
# song_playlist = []


# for column in playlist_dataframe['playlist_id']:
#     song_results = sp.playlist_items(column)
#     for i in song_results['items']:
#         song_name.append(i['track']['name'])
#         song_artist.append(i['track']['artists'][0]['name'])
#         song_album.append(i['track']['album']['name'])
#         song_id.append(i['track']['id'])
#         song_popularity.append(i['track']['popularity'])
#         song_duration.append(i['track']['duration_ms'])
#         song_explicit.append(i['track']['explicit'])
#         song_type.append(i['track']['type'])
#         song_playlist.append(column)


# song_dataframe = pd.DataFrame({'song_name' : song_name, 'song_artist' : song_artist, 'song_album' : song_album,
#                                 'song_id' : song_id, 'song_popularity' : song_popularity, 'song_duration' : song_duration,
#                                 'explicit' : song_explicit, 'type' : song_type, 'song_playlist' : song_playlist})

# # pd.set_option('display.max_columns', None)

# # Initially had the below code to get rid of songs that appeared in more than one playlist
# # but actually we want to keep these if we want to sort by playlist
# # song_dataframe = song_dataframe.drop_duplicates(subset=['song_name'])
# # print(song_dataframe.shape)
# # print(song_dataframe.head())

# # sort by song popularity
# sorted_by_popularity = song_dataframe.sort_values(by=['song_popularity'], ascending=False)
# print(sorted_by_popularity.shape)
# print(sorted_by_popularity.head())

# # group by playlist
# sorted_by_playlist = song_dataframe.groupby('song_playlist')
# print(sorted_by_playlist.first())

# # get one playlist of songs
# print(sorted_by_playlist.get_group('37i9dQZEVXbKuaTI1Z1Afx'))

# # Use song ids to get features of each song

# all_features = dict()

# for playlist in playlist_dataframe['playlist_id']:
#     audio_features = []
#     curr = sorted_by_playlist.get_group(playlist)
#     tracks = curr['song_id']
#     for track in tracks:
#         audio_features.append(sp.audio_features([track]))
#     all_features[playlist] = audio_features

# #print(all_features)

# features_list = []

# for key in all_features.keys():
#     for audio_features in all_features[key]:
#         for features in audio_features:
#             print(features)
#             features_list.append([key, features['energy'], features['liveness'],
#                               features['tempo'], features['speechiness'],
#                               features['acousticness'], features['instrumentalness'],
#                               features['time_signature'], features['danceability'],
#                               features['key'], features['duration_ms'],
#                               features['loudness'], features['valence'],
#                               features['mode'], features['type'],
#                               features['uri']])

# df = pd.DataFrame(features_list, columns=['playlist', 'energy', 'liveness',
#                                               'tempo', 'speechiness',
#                                               'acousticness', 'instrumentalness',
#                                               'time_signature', 'danceability',
#                                               'key', 'duration_ms', 'loudness',
#                                               'valence', 'mode', 'type', 'uri'])
# print(df.head())
# print(df.shape)

# # means = df.groupby(['playlist']).mean()
# # print(means)

# # means.to_csv('features_by_playlist.csv')

# # with open("features_by_playlist.json", "w") as outfile:
# #     json.dump(all_features, outfile)

# #2

# # track_id_1980 = []
# # track_id_1985 = []
# # track_id_1990 = []
# # track_id_1995 = []
# # track_id_2000 = []
# # track_id_2005 = []
# # track_id_2010 = []
# # track_id_2015 = []
# # track_id_2020 = []

# tracks_by_year = dict()

# years = list(range(1980,2021))

# for year in years:
#     curr = []
#     for i in range(0,50,50):
#         track_results = sp.search(q='year:%s'%year, type='track', limit=50,offset=i)
#         for i, t in enumerate(track_results['tracks']['items']):
#             curr.append(t['id'])
#     tracks_by_year[year] = curr

# # print(tracks_by_year)

# features_by_year = dict()

# for year in years:
#     curr = []
#     for song_id in tracks_by_year[year]:
#         curr.append(sp.audio_features([song_id]))
#     features_by_year[year] = curr

# #print(features_by_year)

# features_year_list = []

# for year in years:
#     for song in features_by_year[year]:
#         for features in song:
#                 features_year_list.append([year, features['energy'], features['liveness'],
#                               features['tempo'], features['speechiness'],
#                               features['acousticness'], features['instrumentalness'],
#                               features['time_signature'], features['danceability'],
#                               features['key'], features['duration_ms'],
#                               features['loudness'], features['valence'],
#                               features['mode'], features['type'],
#                               features['uri']])

# features_year_df = pd.DataFrame(features_year_list, columns=['year', 'energy', 'liveness',
#                                               'tempo', 'speechiness',
#                                               'acousticness', 'instrumentalness',
#                                               'time_signature', 'danceability',
#                                               'key', 'duration_ms', 'loudness',
#                                               'valence', 'mode', 'type', 'uri'])


# print(features_year_df.head())
# print(features_year_df.shape)


# means2 = features_year_df.groupby(['year']).mean()
# print(means2)

# df2 = means2[['energy']].copy()
# df2.insert(0,'feature','energy')


# df3 = means2[['liveness']].copy()
# df3.insert(0,'feature', 'liveness')
# df3.to_csv('liveness_by_year.csv')

# df4 = means2[['speechiness']].copy()
# df4.insert(0,'feature', 'speechiness')
# df4.to_csv('speechiness_by_year.csv')

# df5 = means2[['acousticness']].copy()
# df5.insert(0,'feature', 'acousticness')
# df5.to_csv('acousticness_by_year.csv')

# df6 = means2[['instrumentalness']].copy()
# df6.insert(0,'feature', 'instrumentalness')
# df6.to_csv('instrumentalness_by_year.csv')

# df7 = means2[['danceability']].copy()
# df7.insert(0,'feature', 'danceability')
# df7.to_csv('danceability_by_year.csv')

# df8 = means2[['loudness']].copy()
# df8.insert(0,'feature', 'loudness')
# df8.to_csv('loudness_by_year.csv')

# df9 = means2[['valence']].copy()
# df9.insert(0,'feature', 'valence')
# df9.to_csv('valence_by_year.csv')

# df10 = means2[['mode']].copy()
# df10.insert(0,'feature', 'mode')
# df10.to_csv('mode_by_year.csv')

# 3

# us = pd.read_csv(
#     "us-reduced_genre_network-2019.csv", on_bad_lines="skip", delimiter="\t"
# )

# print(us.head())
# print(us.columns)

# us = us.groupby(['source']).mean()
# us = us.sort_values(by='weight')
# print(us.head())
# us_genres = us[['weight','avg_streams']].copy()
# us_genres.to_csv('us_genres.csv')

# newfile = pd.read_csv("us_genres.csv")
# newfile = newfile.sort_values(by="source")
# newfile.to_csv("new_us_genres.csv")

# 4

# have to add commas to the csv files in order for them to be parsed in js
# countries = ["au", "br", "ca", "de", "fr", "gb", "global", "jp"]
# index = 0

# for country in countries:
#     country = pd.read_csv(
#         "%s-reduced_genre_network-2019.csv" % country,
#         on_bad_lines="skip",
#         delimiter="\t",
#     )
#     country = country.groupby(["source"]).mean()
#     country["country"] = countries[index]
#     country.to_csv("%s_genres.csv" % countries[index])
#     index += 1

# us = pd.read_csv(
#     "us-reduced_genre_network-2019.csv", on_bad_lines="skip", delimiter="\t"
# )

# # print(us.head())
# # print(us.columns)

# us = us.groupby(["source"]).mean()


# # us = us.sort_values(by='weight')
# # print(us.head())
# us_genres = us[["weight", "avg_streams"]].copy()
# us_genres.to_csv("us_genres.csv")

# us2 = pd.read_csv("us_genres.csv")
# us2["country"] = "us"

# newfile = pd.read_csv("us_genres.csv")
# newfile = newfile.sort_values(by="source")
# newfile.to_csv("new_us_genres.csv")


# us_new = us[['source', 'weight']].copy()

# normalized_us=us_new.apply(lambda x: (x-x.mean())/ x.std(), axis=0)
# print(normalized_us.head())

# means2 = means2.transpose()
# print(means2)

# means2.to_csv('features_by_year.csv')
# means2.to_json('features_by_year.json')

# tracks_by_year['1980'] = track_id_1980

# 5

# take only rows where source is the top 10 or so genres, then
# rearrange such that each row has every country

genres = pd.read_csv("genres.csv")
genres = genres.drop(["weight"], axis=1)

genres.to_csv("new_genres.csv")
print(genres.head())
