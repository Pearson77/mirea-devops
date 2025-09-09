from src.repositories.data_repository import DataRepository
from src.services.data_service import DataService


async def get_data_service() -> DataService:
    return DataService(DataRepository())