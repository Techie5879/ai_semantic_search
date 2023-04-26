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