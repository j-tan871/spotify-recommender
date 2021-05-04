import os
from dotenv import load_dotenv
import numpy as np
import spotipy
from spotipy.oauth2 import SpotifyOAuth

class Util: 

    def setup(self): 
        load_dotenv()
        return spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=os.getenv("CLIENT_ID"),
                                                                client_secret=os.getenv("CLIENT_SECRET"),
                                                                redirect_uri=os.getenv("REDIRECT"),
                                                                scope="user-top-read"))

    '''
    Gets a user's top 10 tracks on Spotify, with the characteristics of each track. 
    input: Spotify object
    output: Hashmap { track_name, [ danceability, energy, key, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo ] }
    '''
    def top_tracks(self, sp):
        results = sp.current_user_top_tracks(limit=10)
        
        track_data = {}

        for idx, item in enumerate(results['items']):
            track = item['name']
            track_data[item['name']] = [self.characteristics(sp, item['uri'])]
        
        return track_data

    '''
    Gets the characteristics of a track by song URI. 
    input: Spotify object, song URI
    output: List of characteristics: [ danceability, energy, key, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo ]
    '''
    def characteristics(self, sp, uri):
        char = sp.audio_features(tracks=[uri])
        return [char[0]['danceability'], char[0]['energy'], char[0]['key'], char[0]['loudness'], char[0]['speechiness'], 
            char[0]['acousticness'], char[0]['instrumentalness'], char[0]['liveness'], char[0]['valence'], char[0]['tempo']]

    '''
    Gets 5 artists and artist information by artist name
    intput: Spotify object, artist name
    output: Hashmap of { artist_name, [artist_id, artist_image] }
    '''
    def find_artists(self, sp, name): 
        result = sp.search(q="Lizzy", type="artist", limit=5)
        artists = {}

        for item in result['artists']['items']: 
            artists[item['name']] = [item['id'], item['images'][2]['url']]

        return artists

    '''
    Gets an artist's top 10 tracks and track characteristics by artist id
    input: artist id
    output: Hashmap of { track_name, [ danceability, energy, key, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo ] }
    '''
    def find_artist_top_tracks(self, sp, artist_id):
        result = sp.artist_top_tracks(artist_id)
        tracks = {}
        for track in result['tracks']: 
            tracks[track['name']] = self.characteristics(sp, track['uri'])

        return tracks

    '''
    Calculates the total euclidean distance between the user's top tracks and the artist's top tracks
    output: Hashmap of { track_name, distance }
    '''
    def total_distance(self, sp, user_tracks, artist_tracks):
        distances = {}

        for track_name in artist_tracks: 
            distance = 0.0
            point_1 = np.array(artist_tracks[track_name])
            for user_track_name in user_tracks: 
                point_2 = np.array(user_tracks[user_track_name])
                distance += np.linalg.norm(point_1 - point_2)
            distances[track_name] = distance
        
        return distances
    
    '''
    Sorts the artist top tracks by euclidean distance
    '''
    def sort(self, distances):
        return sorted(distances.items(), key=lambda x:x[1], reverse=False)

# util = Util()
# sp = util.setup()
# user_tracks = util.top_tracks(sp)
# artist_tracks = util.find_artist_top_tracks(sp, '1GmsPCcpKgF9OhlNXjOsbS')
# distances = util.total_distance(sp, user_tracks, artist_tracks)
# print(util.sort(distances))