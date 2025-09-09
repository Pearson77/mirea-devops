from sqlalchemy import Column, Integer, String, DateTime, func

from .database import Base


class UsersOrm(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=True)
    gender = Column(String, nullable=False, default='М')
    school_number = Column(String, nullable=True)
    class_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
