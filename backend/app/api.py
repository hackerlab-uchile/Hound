from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

accelerometers = [
    {
        "id": "1",
        "item": "A"
    },
    {
        "id": "2",
        "item": "B"
    }
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "App backend"}


@app.get("/accelerometer", tags=["accelerometers"])
async def get_accelerometers() -> dict:
    return { "data": accelerometers }
