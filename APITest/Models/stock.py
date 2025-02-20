from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from Config.database import Base

class Stock(Base):
    __tablename__ = "Stock"

    id = Column(Integer, primary_key=True, index=True)
    resellers_id = Column(Integer, ForeignKey("Resellers.id"), nullable=False)
    Name = Column(String, nullable=False)
    Price = Column(Integer, nullable=False)
    Date = Column(DateTime, default=func.now())

    reseller = relationship("Reseller", back_populates="stock", uselist=False)
