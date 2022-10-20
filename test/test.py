import json
import os
import random
import string
import time
import urllib3

from signature_generator import SignatureGenerator

USER = 'Uf864505552fa23d5b3e25b864a235e66'
SERVER_URL = 'https://test-api.blockchain.line.me'
API_SECRET = os.environ['HOOP_BLOCKCHAIN_API_SECRET']
API_KEY = os.environ['HOOP_BLOCKCHAIN_API_KEY']
CONTRACT_ID = os.environ['HOOP_BLOCKCHAIN_CONTRACT_ID']

http = urllib3.PoolManager()


def get_signature(method, path, timestamp, nonce, query_params, body):
    generator = SignatureGenerator()
    return generator.generate(API_SECRET, method, path, timestamp, nonce, query_params, body)


def GET_v1_time():
    path = '/v1/time'

    headers = {
        'service-api-key': API_KEY,
    }

    return http.request('GET', SERVER_URL + path, headers=headers, timeout=120)


def GET_v1_users_userId_item_tokens_contractId_non_fungibles(server_time: str):
    nonce = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(8))

    path = '/v1/users/' + USER + '/item-tokens/' + CONTRACT_ID + '/non-fungibles'

    query_params = {
        'limit': 10,
        'orderBy': 'desc',
        'page': 1
    }

    headers = {
        'service-api-key': API_KEY,
        'nonce': nonce,
        'timestamp': server_time
    }


    signature = get_signature('GET', path, server_time, nonce, query_params, {})
    headers['signature'] = signature

    return http.request('GET', SERVER_URL + path, fields=query_params, headers=headers, timeout=120)



def main():
    i = 0
    start_time = time.time()
    for i in range(100000):
        last_execution_start_time = time.time()
        res = GET_v1_time()
        if res.status != 200:
            print('GET_v1_time')
            print(res.status)
            print(res.data)
            print(i)
            print(time.time() - start_time)
            print(time.time() - last_execution_start_time)
            break
        server_time = json.loads(res.data)['responseTime']

        last_execution_start_time = time.time()
        res = GET_v1_users_userId_item_tokens_contractId_non_fungibles(server_time)
        if res.status != 200:
            print('GET_v1_users_userId_item_tokens_contractId_non_fungibles')
            print(res.status)
            print(res.data)
            print(i)
            print(time.time() - start_time)
            print(time.time() - last_execution_start_time)
            break
        i += 1


if __name__ == "__main__":
    main()