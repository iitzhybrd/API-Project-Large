from quart import Blueprint, request, jsonify
from Services.resellers_service import get_resellers, get_reseller_by_id, create_reseller, update_reseller, delete_reseller
from mutex import crud_mutex

resellers_bp = Blueprint("resellers", __name__)

@resellers_bp.route('/resellers', methods=['GET'])
async def get_resellers_route():
    # Acquire the mutex lock
    with crud_mutex:
        reseller = get_resellers()
        reseller_list = [reseller.__dict__ for reseller in reseller]
        for reseller in reseller_list:
            reseller.pop('_sa_instance_state', None)
        return jsonify(reseller_list)

@resellers_bp.route('/resellers/<int:reseller_id>', methods=['GET'])
async def get_single_reseller_route(reseller_id):
    # Acquire the mutex lock
    with crud_mutex:
        reseller = get_reseller_by_id(reseller_id)
        if reseller:
            response_data = {
                "id": reseller.id,
                "Name": reseller.Name,
                "Username": reseller.Username,
                "Last_active": reseller.Last_active.strftime('%Y-%m-%d %H:%M:%S'),
                "Email": reseller.Email
            }
            return jsonify(response_data)
        else:
            return "Reseller not found", 404

@resellers_bp.route('/resellers', methods=['POST'])
async def create_reseller_route():
    data = await request.get_json()
    try:
        # Acquire the mutex lock
        with crud_mutex:
            reseller = create_reseller(data)
        return {"success": True, "message": "Reseller created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@resellers_bp.route('/resellers/<int:reseller_id>', methods=['PUT'])
async def update_single_reseller_route(reseller_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        reseller = update_reseller(reseller_id, data)
        if reseller:
            return {"success": True, "message": "Reseller updated"}, 200
        else:
            return {"error": "Reseller not found"}, 404

@resellers_bp.route('/resellers/<int:reseller_id>', methods=['DELETE'])
async def delete_single_reseller_route(reseller_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_reseller(reseller_id)
        if success:
            return jsonify({"success": True, "message": "Reseller deleted"}), 200
        else:
            return jsonify({"error": "Reseller not found"}), 404

