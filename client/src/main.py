import requests
import pyufw

print("....")

# Should be generated
client_id = "1234abcd"

ufw_status = pyufw.status(detailed=True)
print(ufw_status)


announce_request = {
    "clientState": ufw_status,
    "clientId": client_id
}

# endpoint
endpoint = "http://localhost:3000"

response = requests.put(endpoint + "/announce", json=announce_request)

response_json = response.json()
print(response_json)
