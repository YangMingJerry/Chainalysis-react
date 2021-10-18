cd backend-py/
source venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
. entrypoint.sh &
cd ../frontend-js
npm install
npm run dev

