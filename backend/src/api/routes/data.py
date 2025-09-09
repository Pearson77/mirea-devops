from fastapi import APIRouter, Depends
from starlette.responses import FileResponse

from src.api.dependencies import get_data_service
from src.schemas.users import UserCreateSchema
from src.services.data_service import DataService

router = APIRouter()


@router.post("/send-data")
async def save_user(user: UserCreateSchema, data_service: DataService = Depends(get_data_service)):
    return await data_service.save_user(user)


@router.get("/download-excel")
async def get_data(data_service: DataService = Depends(get_data_service)):
    await data_service.get_users()
    return FileResponse('./src/data.xlsx', media_type='application/vnd.openxmlformats.officedocument.spreadsheetml.sheet', filename='users.xlsx')
