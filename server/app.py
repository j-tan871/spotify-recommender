from flask import Flask, session, request, redirect, jsonify 
from flask_session import Session
from flask_cors import CORS, cross_origin
import spotipy
import uuid
import os

from util import Util

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session'
Session(app)

caches_folder = './.spotify_caches/'
if not os.path.exists(caches_folder):
    os.makedirs(caches_folder)

def session_cache_path():
    return caches_folder + session.get('uuid')

util = Util()
sp = util.setup()

@app.route('/')
@cross_origin()
def index():
    try:
        # Remove the CACHE file (.cache-test) so that a new user can authorize.
        if session.get('uuid'):
            os.remove(session_cache_path())
            session.clear()
    except OSError as e:
        print ("Error: %s - %s." % (e.filename, e.strerror))

    if not session.get('uuid'):
        session['uuid'] = str(uuid.uuid4())

    cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
    auth_manager = spotipy.oauth2.SpotifyOAuth(scope='user-top-read',
                                                cache_handler=cache_handler, 
                                                show_dialog=True,
                                                client_id=os.environ.get("CLIENT_ID"), 
                                                client_secret=os.environ.get("CLIENT_SECRET"),
                                                redirect_uri=os.environ.get("REDIRECT_DEV"))

    if request.args.get("code"):
        auth_manager.get_access_token(request.args.get("code"))
        return redirect(os.environ.get("REDIRECT"))

    if not auth_manager.validate_token(cache_handler.get_cached_token()):
        auth_url = auth_manager.get_authorize_url()
        return jsonify(url=auth_url)
    
    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return 'Hello World!'

@app.route('/search/<string:name>')
@cross_origin()
def search(name):
    return {'artists' : util.find_artists(sp, name)}

@app.route('/results/<string:artist>')
@cross_origin()
def results(artist):
    return util.find_similar_tracks(sp, artist)

@app.route('/customresults/<string:artist_id>/<string:characteristics>')
@cross_origin()
def customresults(artist_id, characteristics): 
    ch = characteristics.split(':')
    float_ch = []
    for c in ch:
        float_ch.append(float(c))

    return util.k_nearest_neighbors(sp, float_ch, artist_id)

if __name__ == "__main__":
    app.run()