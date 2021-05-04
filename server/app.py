from flask import Flask
from flask_cors import CORS, cross_origin
from util import Util

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

util = Util()
sp = util.setup()

@app.route('/')
@cross_origin()
def index():
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