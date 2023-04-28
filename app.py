from dotenv import load_dotenv
from flask import Flask, request
import os
import openai
import pinecone
import json

app = Flask(__name__)

final = {}

# Loading environment variables
load_dotenv()
OPENAI_KEY = os.getenv("OPENAI_KEY")
PINECONE_KEY = os.getenv("PINECONE_KEY")

openai.api_key = OPENAI_KEY

# Selecting ada-002 model for text embeddings
MODEL = "text-embedding-ada-002"

# Initialize pinecone connection
pinecone.init(
    api_key=PINECONE_KEY,
    environment="us-west1-gcp"  # find next to api key in   console
)

# Select index name and connect to index
index_name = 'semantic-search'
index = pinecone.Index(index_name)


@app.route('/predictor', methods=["POST"])
def predict():
    query = request.get_json()
    # Translation API call
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="Translate this to English (if already in english, just return input text): " + query,
        temperature=0.3,
        max_tokens=15,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    # Created embeddings for translated text
    
    xq = openai.Embedding.create(input=response['choices'][0]['text'], engine=MODEL)['data'][0]['embedding']
    res = index.query([xq], top_k=5, include_metadata=True)
    
    for i in range(len(res['matches'])):
        final[i] = res['matches'][i]['id']

    json_obj = json.dumps(final)
    
    return json_obj