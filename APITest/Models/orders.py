from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class Orders(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    clients_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    Date = Column(Date, default=func.now())
    Status = Column(String, nullable=True)
    Total = Column(Float, nullable=True)

    clients = relationship("Clients", back_populates="orders")
