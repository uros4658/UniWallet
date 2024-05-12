import requests


bullish_converter = {'Very Bearish': 0, 'Bearish': 1, 'Neutral': 2, 'Bullish': 3, 'Very Bullish': 4}
def wallet_founder(wallet_dictionary, purchase_currency, purchase_amount):
    prediction_dict = {}
    for wallet_id, currencies in wallet_dictionary.items():
        if purchase_currency in currencies:
            if float(purchase_amount) <= float(currencies[purchase_currency]):
                return wallet_id, purchase_currency
        else:
            for currency in currencies:
                if currency not in prediction_dict:
                    prediction_data = requests.get(
                        "https://www.binance.com/bapi/composite/v1/friendly/cms/rating?ratingId=SEO-" +
                        str(currency)).json()
                    max_title = max(prediction_data['data']['scaleList'], key=lambda x: x['count'])['title']
                    prediction_dict[currency] = bullish_converter.get(max_title, 0)
    prediction_dict['XVG'] = 2
    print(prediction_dict)
    sorted_currencies = sorted(prediction_dict, key=prediction_dict.get)
    print(sorted_currencies)
    for wallet_id, currencies in wallet_dictionary.items():
        for currency in sorted_currencies:
            if currency in currencies:
                if currency in currencies:
                    try:
                        endpoint = f"https://api.binance.com/api/v3/ticker/price?symbol={currency}" \
                                   f"{purchase_currency}"
                        response = requests.get(endpoint).json()
                        changing_rate = float(response['price'])
                    except KeyError as e:
                        if str(e) == "'price'":
                            endpoint = f"https://api.binance.com/api/v3/ticker/price?symbol={purchase_currency}" \
                                       f"{currency}"
                            response = requests.get(endpoint).json()
                            changing_rate = 1 / float(response['price'])

                    if float(currencies[currency]) * changing_rate >= float(purchase_amount):
                        return wallet_id, currency

    raise ValueError("You do not have enough money in your wallets to make this purchase")
