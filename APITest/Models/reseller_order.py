from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from Config.database import Base
from sqlalchemy.sql import func

class ResellerOrders(Base):
    __tablename__ = "reseller_orders"

    id = Column(Integer, primary_key=True)
    resellers_id = Column(Integer, ForeignKey("Resellers.id"), nullable=False)
    Date = Column(Date, default=func.now())
    Status = Column(String, nullable=True)
    Total = Column(Float, nullable=True)

    reseller = relationship("Reseller", back_populates="reseller_orders", uselist=False)
