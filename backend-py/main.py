import json
from functools import lru_cache

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

path = './data/realtime.json'
path_r = './data/recom.json'
app = FastAPI()

# enabling CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@lru_cache
@app.get('/prices')
async def get_price():
    with open(path,'r') as f:
        out = json.load(f)
    return out

@lru_cache
@app.get('/recommend')
async def get_recom():
    with open(path_r,'r') as f:
        out = json.load(f)
    return out