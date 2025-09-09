from fastapi import APIRouter

from src.api.routes.data import router as data_router

base_router = APIRouter()
base_router.include_router(data_router)