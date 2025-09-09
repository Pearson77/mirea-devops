from pydantic import BaseModel


class UserCreateSchema(BaseModel):
    first_name: str
    gender: str
    school_number: str
    class_number: str


class UserInDBSchema(BaseModel):
    id: int = 0
    first_name: str
    gender: str
    school_number: str
    class_number: str