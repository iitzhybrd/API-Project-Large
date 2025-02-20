# login_details_routes.py
from quart import Blueprint, request, jsonify
from Services.login_details_service import get_login_details, get_login_details_by_id, create_login_details, update_login_details, delete_login_details
from mutex import crud_mutex

login_details_bp = Blueprint("login_details", __name__)

@login_details_bp.route('/login_details', methods=['GET'])
async def get_login_details_route():
    # Acquire the mutex lock
    with crud_mutex:
        login_details = get_login_details()
        login_details_list = [login.__dict__ for login in login_details]
        for login in login_details_list:
            login.pop('_sa_instance_state', None)
        return jsonify(login_details_list)

@login_details_bp.route('/login_details/<int:login_details_id>', methods=['GET'])
async def get_single_login_details_route(login_details_id):
    # Acquire the mutex lock
    with crud_mutex:
        login_details = get_login_details_by_id(login_details_id)
        if login_details:
            response_data = {
                "id": login_details.id,
                "clients_id":login_details.clients_id,
                "Username": login_details.Username,
                "Email_address": login_details.Email_address,
                "Password": login_details.Password
            }
            return jsonify(response_data)
        else:
            return "Login details not found", 404

@login_details_bp.route('/login_details', methods=['POST'])
async def create_login_details_route():
    data = await request.get_json()

    try:
        # Acquire the mutex lock
        with crud_mutex:
            login_details = create_login_details(data)
        return {"Success": True, "message": "Login details created"}, 201
    except Exception as e:
        return {"error": "Could not be inserted into the database"}, 500

@login_details_bp.route('/login_details/<int:login_details_id>', methods=['PUT'])
async def update_single_login_details_route(login_details_id):
    data = await request.get_json()
    # Acquire the mutex lock
    with crud_mutex:
        login_details = update_login_details(login_details_id, data)
        if login_details:
            return "Login details updated", 200
        else:
            return "Login details not found", 404

@login_details_bp.route('/login_details/<int:login_details_id>', methods=['DELETE'])
async def delete_single_login_details_route(login_details_id):
    # Acquire the mutex lock
    with crud_mutex:
        success = delete_login_details(login_details_id)
        if success:
            return "Login details deleted", 200
        else:
            return "Login details not found", 404
