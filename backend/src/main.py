import asyncio

import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.database import create_tables
from src.api import base_router

app = FastAPI(root_path='/api')
app.include_router(base_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    # asyncio.run(create_tables())
    uvicorn.run(app, host="0.0.0.0", port=8080)