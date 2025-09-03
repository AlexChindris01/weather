import os
import json
import urllib3


API_KEY = os.environ.get('OPEN_WEATHER_MAP_API_KEY')
requester = urllib3.PoolManager()


def lambda_handler(event, context):
    coords = event.get('queryStringParameters', {})
    lat = coords.get('lat')
    lon = coords.get('lon')
    url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API_KEY}'
    try:
        response = requester.request('GET', url)
        data = json.loads(response.data.decode('utf-8'))
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps(data)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }