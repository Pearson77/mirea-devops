from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from ..config import Config

config = Config()


class Base(DeclarativeBase):
    pass


engine = create_async_engine(config.DB_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def create_tables():
    from src.database.models import UsersOrm
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def delete_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
