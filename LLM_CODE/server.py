import pickle
import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModel
from flask import Flask, request, jsonify

# Load saved objects
with open("embeddings_dataset.pkl", "rb") as f:
    embeddings_dataset = pickle.load(f)

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)



app = Flask(__name__)
def cls_pooling(model_output):
    return model_output.last_hidden_state[:, 0]

def get_embeddings(text_list):
    encoded_input = tokenizer(text_list, padding=True, truncation=True, return_tensors="pt")
    model_output = model(**encoded_input)
    return cls_pooling(model_output).detach().numpy()

@app.route('/get_policies', methods=['POST'])
def get_policies():
    data = request.json
    print(data)
    question = data.get('question', '')
    print(question)
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    question_embedding = get_embeddings([question])
    scores, samples = embeddings_dataset.get_nearest_examples("embeddings", question_embedding, k=5)
    samples_df = pd.DataFrame.from_dict(samples)
    samples_df["scores"] = scores
    samples_df.sort_values("scores", ascending=False, inplace=True)

    prompt = samples_df.iloc[:, :-3].to_csv(index=False)

    # Generate response using Gemini modelcl
    import google.generativeai as genai
    import os

    api_key = "AIzaSyAt7ISPqMfg_D8Kj6y13uVS4RoQVNVkcUA"
    genai.configure(api_key=api_key)
    gemini_model = genai.GenerativeModel('gemini-1.5-flash')
    response = gemini_model.generate_content("Generate each row (Plan) in a detailed way" + "\n" + prompt)
    print(response.text)
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)