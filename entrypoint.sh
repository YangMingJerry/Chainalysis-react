apt install python3-pip
apt install python3.8-venv
apt install npm
cd backend-py/
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
. entrypoint.sh &
cd ../frontend-js
npm install
npm run dev

