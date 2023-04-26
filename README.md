# BrainQuery - AI Semantic Search
Do you have difficulty finding relevant research papers? BrainQuery to the rescue! It employs AI Semantic Search to find hidden meaning behind searches and uses that to search through the abstracts of papers from the arXiv database - a large open-access archive of scientific material. (and yes, it has dark mode too!)

It even includes multi language support using OpenAI translation, which makes searches possible in any language.
## Technologies Used:

### Frontend:
- ReactJS
- Tailwind CSS

### Backend:
- Flask API
- OpenAI API (for Text Embeddings and Translation)
- Pinecone (Vector Database)

## Screenshots:
![Dark page](/images/dark.jpg?raw=true "Dark Page")

### Example Query: "minimum resource quantum computation increase"
![Query1](/images/query1.png?raw=true "Query1")

### Example Query (German): "I-V-Eigenschaften von MgB2" (translation: I-V properties of MgB2)
![Query2](/images/query2.png?raw=true "Query2")

### Example Query (Bengali): "মিন রিসোর্স কোয়ান্টাম কম্পিউটেশন বৃদ্ধি" (translation: min resource quantum computation increase)
![Query3](/images/query3.png?raw=true "Query3")

## How It Works: 
The dataset consists of the arXiv Dataset (https://www.kaggle.com/datasets/Cornell-University/arxiv), of which, the first 15000 entries have been used for this project (due to Pinecone Restrictions). The embeddings for the abstract of each article were created (using OpenAI's ada-002 model), which has a dimensionality of 1536. These embeddings were then indexed in the Pincone Vector Database.
For Queries, this project uses OpenAI's translation (text completion via text-davinci-003 model) and embeddings (ada-002 model) to first translate given query into English and then embed it. A query is then made to the Pinecone database, which computes the top 5 items with consine similarity and returns the results as per ranking (most similar first), which is then displayed using the React frontend.