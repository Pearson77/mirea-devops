from sqlalchemy import insert, select

from ..database.models import UsersOrm
from ..database.database import async_session_maker
from ..schemas.users import UserInDBSchema


class DataRepository:
    @staticmethod
    async def save_user(user: UserInDBSchema):
        async with async_session_maker() as session:
            async with session.begin():
                result = await session.execute(
                    insert(UsersOrm).values(
                        user.model_dump(exclude={'id'})
                    ).returning(UsersOrm.id)
                )
                await session.commit()
                return result.scalar_one_or_none()

    @staticmethod
    async def get_users():
        async with async_session_maker() as session:
            async with session.begin():
                result = await session.execute(
                    select(UsersOrm)
                )
                rows = result.scalars().all()
                return [
                    {
                        "ID": row.id,
                        "Имя": row.first_name,
                        "Пол": row.gender,
                        "Школа": row.school_number,
                        "Класс": row.class_number,
                        "Зарегистрирован": str(row.created_at),
                    }
                    for row in rows
                ]
