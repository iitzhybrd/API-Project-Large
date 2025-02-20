from quart import Blueprint, request, jsonify
from Services.stock_service import get_stock, get_stock_item, create_stock_item, update_stock_item, delete_stock_item
from mutex import crud_mutex

stock_bp = Blueprint("stock", __name__)

@stock_bp.route('/stock', methods=['GET'])
async def get_stock_route():
    # Acquire the mutex lock
    with crud_mutex:
        stock_items = get_stock()
        stock_list = [item.__dict__ for item in stock_items]
        for item in stock_list:
            item.pop('_sa_instance_state', None)
        return jsonify(stock_list)

@stock_bp.route('/stock/<int:item_id>', methods=['GET'])
async def get_stock_item_route(item_id):
    # Acquire the mutex lock
    with crud_mutex:
        item = get_stock_item(item_id)
        if item:
            response_data = {
                "id": item.id,
                "resellers_id": item.resellers_id,
                "Name": item.Name,
                "Price": item.Price,
                "Date": item.Date.strftime('%Y-%m-%d %H:%M:%S')
            }
            return jsonify(response_data)
        else:
            return "Stock item not found", 404

@stock_bp.route('/stock', methods=['POST'])
async def create_stock_item_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            stock_item = create_stock_item(data)
        return {"Success": True, "message": "Stock created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@stock_bp.route('/stock/<int:item_id>', methods=['PUT'])
async def update_stock_item_route(item_id):
    data = await request.get_json()

    # Acquire the mutex lock
    with crud_mutex:
        item = update_stock_item(item_id, data)
        if item:
            return {"success": True, "message": "Stock updated"}, 200
        else:
            return "Stock item not found", 404

@stock_bp.route('/stock/<int:item_id>', methods=['DELETE'])
async def delete_stock_item_route(item_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_stock_item(item_id)
        if success:
            return "Stock item deleted", 200
        else:
            return "Stock item not found", 404
