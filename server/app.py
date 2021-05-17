from flask import Flask, request, redirect, jsonify
from flask_cors import CORS, cross_origin
from util import Util
import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

util = Util()
# sp = util.setup()

load_dotenv()

@app.route('/')
@cross_origin()
def index():
    sp_oauth = SpotifyOAuth(client_id=os.getenv("CLIENT_ID"),
                                    client_secret=os.getenv("CLIENT_SECRET"),
                                    redirect_uri=os.getenv("REDIRECT_DEV"),
                                    scope="user-top-read")
    return jsonify(url=sp_oauth.get_authorize_url())

@app.route('/callback')
@cross_origin()
def callback():
    sp_oauth = SpotifyOAuth(client_id=os.getenv("CLIENT_ID"),
                                    client_secret=os.getenv("CLIENT_SECRET"),
                                    redirect_uri=os.getenv("REDIRECT_DEV"),
                                    scope="user-top-read")

    code = request.args.get('code')
    print(code)
    token_info = sp_oauth.get_access_token(code)
    print(token_info)

    return redirect('http://localhost:3000/input/' + token_info['access_token'])

@app.route('/search/<string:name>/<string:tok>')
@cross_origin()
def search(name, tok):
    sp = spotipy.Spotify(auth=tok)
    return {'artists' : util.find_artists(sp, name)}

@app.route('/results/<string:artist>/<string:tok>')
@cross_origin()
def results(artist, tok):
    sp = spotipy.Spotify(auth=tok)
    return util.find_similar_tracks(sp, artist)

@app.route('/customresults/<string:artist_id>/<string:characteristics>/<string:tok>')
@cross_origin()
def customresults(artist_id, characteristics, tok): 
    ch = characteristics.split(':')
    float_ch = []
    for c in ch:
        float_ch.append(float(c))
    sp = spotipy.Spotify(auth=tok)
    return util.k_nearest_neighbors(sp, float_ch, artist_id)

if __name__ == "__main__":
    app.run()