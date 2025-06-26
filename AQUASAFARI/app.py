from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/shikara-boat')
def shikara_boat():
    return render_template('shikara-boat.html')

@app.route('/Payment')
def booking_payment():
    return render_template('Payment.html')

@app.route('/destinations')
def destinations():
    return render_template('destinations.html')

@app.route('/google-reviews')
def google_reviews():
    return render_template('google-reviews.html')

@app.route('/write-google-review')
def write_google_review():
    return render_template('write-google-review.html')

@app.route('/tripadvisor-review')
def tripadvisor_review():
    return render_template('tripadvisor-review.html')

# API Endpoints for Reviews
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    reviews = list(reviews_collection.find().sort('date', -1))
    for review in reviews:
        review['_id'] = str(review['_id'])
        review['date'] = review['date'].isoformat()
    return jsonify(reviews)

@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        review_data = request.get_json()
        review_data['date'] = datetime.utcnow()
        result = reviews_collection.insert_one(review_data)
        
        inserted_review = reviews_collection.find_one({'_id': result.inserted_id})
        inserted_review['_id'] = str(inserted_review['_id'])
        inserted_review['date'] = inserted_review['date'].isoformat()
        
        return jsonify({
            'success': True,
            'review': inserted_review
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)