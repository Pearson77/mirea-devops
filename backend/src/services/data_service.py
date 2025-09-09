from pandas import DataFrame

from src.repositories.data_repository import DataRepository
from src.schemas.users import UserCreateSchema, UserInDBSchema


class DataService:
    def __init__(self, users_repository: DataRepository):
        self.repository = users_repository

    async def save_user(self, user: UserCreateSchema):
        user_to_save = UserInDBSchema(**user.model_dump())
        return await self.repository.save_user(user_to_save)

    async def get_users(self):
        users = await self.repository.get_users()
        df = DataFrame(users)
        df.to_excel('./src/data.xlsx', index=False)
        return users