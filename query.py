from dotenv import load_dotenv
import pandas as pd
# from datasets import load_dataset
import os
import openai
from tqdm.auto import tqdm
import pinecone

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

# Take this as user input
query = "I-V characteristics of MgB2"

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Translate this to English: " + query,
  temperature=0.3,
  max_tokens=100,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)


xq = openai.Embedding.create(input=query, engine=MODEL)['data'][0]['embedding']

res = index.query([xq], top_k=5, include_metadata=True)

for match in res['matches']:
    print(f"{match['score']:.2f}: {match['metadata']['title']}")