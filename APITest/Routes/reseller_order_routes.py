from quart import Blueprint, request, jsonify
from Services.reseller_order_service import get_reseller_orders, get_reseller_order_by_id, create_reseller_order, update_reseller_order, delete_reseller_order
from mutex import crud_mutex

reseller_orders_bp = Blueprint("reseller_orders", __name__)

@reseller_orders_bp.route('/reseller_orders', methods=['GET'])
async def get_reseller_orders_route():
    # Acquire the mutex lock
    with crud_mutex:
        reseller_orders = get_reseller_orders()
        reseller_orders_list = [reseller_order.__dict__ for reseller_order in reseller_orders]
        for reseller_order in reseller_orders_list:
            reseller_order.pop('_sa_instance_state', None)
        return jsonify(reseller_orders_list)

@reseller_orders_bp.route('/reseller_orders/<int:reseller_order_id>', methods=['GET'])
async def get_single_reseller_order_route(reseller_order_id):
    # Acquire the mutex lock
    with crud_mutex:
        reseller_order = get_reseller_order_by_id(reseller_order_id)
        if reseller_order:
            response_data = {
                "id": reseller_order.id,
                "resellers_id": reseller_order.resellers_id,
                "Date": reseller_order.Date.strftime('%Y-%m-%d'),
                "Status": reseller_order.Status,
                "Total": reseller_order.Total
            }
            return jsonify(response_data)
        else:
            return "Reseller order not found", 404

@reseller_orders_bp.route('/reseller_orders', methods=['POST'])
async def create_reseller_order_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            reseller_order = create_reseller_order(data)
        return {"Success": True, "message": "Reseller order created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@reseller_orders_bp.route('/reseller_orders/<int:reseller_order_id>', methods=['PUT'])
async def update_single_reseller_order_route(reseller_order_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        reseller_order = update_reseller_order(reseller_order_id, data)
        if reseller_order:
            return "Reseller order updated", 200
        else:
            return "Reseller order not found", 404

@reseller_orders_bp.route('/reseller_orders/<int:reseller_order_id>', methods=['DELETE'])
async def delete_single_reseller_order_route(reseller_order_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_reseller_order(reseller_order_id)
        if success:
            return "Reseller order deleted", 200
        else:
            return "Reseller order not found", 404
