import json
import collections
import time

from loguru import logger
import requests

class TradePlatform:
    def __init__(self):
        self.CURR = 'USD'
        self.LIST_ECURR = ['ETH','BTC']

    def request_generator(self, pair, action=None):
        pass

    def send_request(self, url):
        try:
            resp = requests.get(url)
            data = json.loads(resp.text)
            return data
        except Exception as err:
            logger.error(err)

    def response_parser(self, data):
        pass

    def check_price(self):
        pass

    def float_normalize(self, string):
        return str(float(string))

class Kraken(TradePlatform):
    def request_generator(self, pair, action=None):
        pair_token = pair[0] + pair[1]
        url = f'https://api.kraken.com/0/public/Ticker?pair={pair_token}'
        return url

    def response_parser(self, data):
        try:
            dict_values = list(data.get('result').values())[0]
            buy = self.float_normalize(dict_values.get('a')[0])
            sell = self.float_normalize(dict_values.get('b')[0])
            return buy, sell
        except Exception as err:
            logger.error(err)

    def check_price(self):
        data_dict = collections.defaultdict(dict)
        for ecurr in self.LIST_ECURR:
            url = self.request_generator((ecurr,self.CURR))
            data = self.send_request(url)
            buy,sell = self.response_parser(data)
            data_dict[ecurr]['buy'] = buy
            data_dict[ecurr]['sell'] = sell
        logger.info('data fetched from kraken')
        return data_dict

class Coinbase(TradePlatform):
    def request_generator(self, pair, action=None):
        pair_token = f'{pair[0]}-{pair[1]}'
        url = f'https://api.coinbase.com/v2/prices/{pair_token}/{action}'
        return url

    def response_parser(self, data):
        try:
            out = data.get('data').get('amount')
            return out
        except Exception as err:
            logger.error(err)

    def check_price(self):
        data_dict = collections.defaultdict(dict)
        for ecurr in self.LIST_ECURR:
            data_dict[ecurr] = {}
            for action in ['buy','sell']:
                url = self.request_generator((ecurr,self.CURR),action)
                data = self.send_request(url)
                amount = self.float_normalize(self.response_parser(data))
                data_dict[ecurr][action]=amount
        logger.info('data fetched from coinbase')
        return data_dict

class Handler:
    def __call__(self, *args, **kwargs):
        path = './data/realtime.json'
        path_recom = './data/recom.json'
        coinbase = Coinbase()
        kraken = Kraken()
        try:
            while True:
                time.sleep(0.5)
                self.refresh(path,path_recom,coinbase, kraken)
        except KeyboardInterrupt:
            print('interrupted!')


    def recommend(self,out):
        ecurr_list = ['ETH','BTC']
        recom = {}
        for ecurr in ecurr_list:
            recom[ecurr] = {}
            buys = [(trader,value.get(ecurr).get('buy')) for trader, value in out.items()]
            sells = [(trader, value.get(ecurr).get('sell')) for trader, value in out.items()]
            recom[ecurr]['bestbuy'] = sorted(buys, key=lambda buy: buys[1])[0]
            recom[ecurr]['bestsell'] = sorted(sells, key=lambda sell: sells[1])[-1]
        return recom

    def refresh(self,path,path_recom,coinbase, kraken):
        try:
            out = {}
            data_c = coinbase.check_price()
            data_k = kraken.check_price()
            out['kraken'] = data_k
            out['coinbase'] = data_c
            recom = self.recommend(out)
            with open(path,'w') as f:
                json.dump(out, f, indent=6)
            with open(path_recom,'w') as r:
                json.dump(recom, r, indent=6)
        except Exception as err:
            logger.error(err)

if __name__ == '__main__':
    h = Handler()
    h()

    pass