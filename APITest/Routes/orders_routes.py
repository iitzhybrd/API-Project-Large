from quart import Blueprint, request, jsonify
from Services.orders_service import get_orders, get_order_by_id, create_order, update_order, delete_order
from mutex import crud_mutex

orders_bp = Blueprint("orders", __name__)

@orders_bp.route('/orders', methods=['GET'])
async def get_orders_route():
    # Acquire the mutex lock
    with crud_mutex:
        orders = get_orders()
        order_list = [order.__dict__ for order in orders]
        for order in order_list:
            order.pop('_sa_instance_state', None)
        return jsonify(order_list)

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
async def get_single_order_route(order_id):
    # Acquire the mutex lock
    with crud_mutex:
        order = get_order_by_id(order_id)
        if order:
            response_data = {
                "id": order.id,
                "clients_id": order.clients_id,
                "Date": order.Date.strftime('%Y-%m-%d'),
                "Status": order.Status,
                "Total": order.Total
            }
            return jsonify(response_data)
        else:
            return "Order not found", 404

@orders_bp.route('/orders', methods=['POST'])
async def create_order_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            order = create_order(data)
        return {"Success": True, "message": "Order created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@orders_bp.route('/orders/<int:order_id>', methods=['PUT'])
async def update_single_order_route(order_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        order = update_order(order_id, data)
        if order:
            return "Order updated", 200
        else:
            return "Order not found", 404

@orders_bp.route('/orders/<int:order_id>', methods=['DELETE'])
async def delete_single_order_route(order_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_order(order_id)
        if success:
            return "Order deleted", 200
        else:
            return "Order not found", 404
